const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../logger");
const User = require("../models/User");

// exports.signup =
const signup = async (req, res) => {

	logger.info("Trying to sign up a new user")
	try {
		const { first_name, last_name, email, password, confPassword } = req.body;
		if (password !== confPassword) {
			logger.error("An error occured while trying to sign up: Password and Password confirmation do not match");
			return res.status(400).json({ errors: [{ msg: "Password and Password confirmation do not match" }] })
		}
		console.log(first_name, last_name, email, password, confPassword)
		// hash password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		// check if the user already exists
		const user = await User.query()
			.findOne({ email });
		if (user) {
			logger.error(`A user couldn't sign up since ${email} already exists`)
			return res.status(409).json("User with such email already exists");
		}
		// new user object
		const newUser = {
			first_name,
			last_name,
			email,
			password_hash: hashedPassword,
			is_admin: false,
		};
		// insert new user
		await User.query()
			.insert(newUser)
		logger.info(`A user signed up as ${first_name} ${last_name}`)
		return res.sendStatus(200);
	} catch (error) {
		logger.error(`An error occured while trying to sign up: ${error}`)
		return res.sendStatus(500);
	}
}


// exports.signin =
const signin = async (req, res) => {
	try {
		logger.info("A user is trying to sign in")
		// find user
		const user = await User.query()
			.findOne({ email: req.body.email })
		console.log("user", user)

		// check is user exists
		if (!user) {
			logger.error(`An error occured while trying to sign is, user with the email ${req.body.email} doesn't exist`)
			return res.status(404).json({ errors: [{ msg: "User not found" }] });
		}
		// check password
		const match = await bcrypt.compare(req.body.password, user.password_hash);
		// send an error message is password is incorrect
		if (!match) {
			logger.error("An error occured while trying to sign in: Wrong password is provided")
			return res.status(400).json({ errors: [{ msg: "Wrong Password" }] })
		}
		const { id, email } = user;
		const userId = id;

		// generate access and refresh tokens
		const accessToken = jwt.sign({ userId, email }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '15s'
		});

		const refreshToken = jwt.sign({ userId, email }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '7d'
		});

		// add refresh token to a user in database
		await User.query()
			.where("id", userId)
			.patch({ refresh_token: refreshToken });
		const loggedUser = await User.query()
			.findOne("id", userId);
		// add the refresh token to the response as a cookie
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});
		logger.info(`A user is logged in as: ${email}`)
		res.json({ accessToken, loggedUser });
	} catch (error) {
		logger.error(`An error occured while trying to sign in: ${error}`)
		return res.sendStatus(500);
	}
}

// exports.signout 
const signout = async (req, res) => {

	logger.info("Trying to sign out")
	try {

		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			logger.error("An error occured while trying to sign out: No refresh token is provided")
			return res.sendStatus(204)
		}

		// query a user by refresh token and check if it exists
		const user = await User.query()
			.findOne({ refresh_token: refreshToken })

		if (!user) {
			logger.error("An error occured while trying to sign out: User with provided refresh token is not signed in")
			return res.sendStatus(204)
		}

		// remove the refresh token from the user in database
		await User.query()
			.where("refresh_token", refreshToken)
			.patch({ refresh_token: null });

		// remove the refresh token cookie from the user
		res.clearCookie('refreshToken');
		logger.info(`User with the username ${user.email} is signed out`)
		return res.sendStatus(200);
	} catch (err) {
		logger.error(`An error occured while trying to sign out: ${JSON.stringify(error)}`)
		return res.sendStatus(500);
	}
}
const handleRefreshToken = async (req, res) => {
	logger.info("User is trying to refresh a token...");
	const cookies = req.cookies;
	// check if a refresh token was provided
	if (!cookies?.refreshToken) {
		logger.error("A token cannot be refreshed as no refresh token provided")
		return res.sendStatus(401);
	}
	const refreshToken = cookies.refreshToken;

	// find user by refresh token
	// let foundUser = await database("users")
	// .where("refreshToken", refreshToken);
	const foundUser = await User.query()
		.findOne("refresh_token", refreshToken)
	if (!foundUser) {
		logger.error("A token cannot be refreshed, as the user hasn't been validly authenticated")
		return res.sendStatus(403);
	} //Forbidden 
	// evaluate jwt 
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, decoded) => {
			if (err || foundUser.email !== decoded.email) {
				logger.error("An error occured while verifying the privided refresh token")
				return res.sendStatus(403)
			}
			// new access token
			const accessToken = jwt.sign(
				{ userId: decoded.userId, email: decoded.email },
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '15s' },
			);
			logger.info(`The access token is refreshed`)
			res.json({ accessToken })
		}
	);
}

module.exports = {
	signup,
	signin,
	signout,
	handleRefreshToken,
}