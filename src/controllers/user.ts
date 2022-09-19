import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import logger from "../logger";
import User from "../models/User";
import { userSchema } from "../validationSchemas/user";

export async function getAllUsers
	(req: Request, res: Response): Promise<void> {
	const users = await User
		.query()

	res.send({ data: { users } });
}

export async function getUserById
	(req: Request, res: Response): Promise<void> {
	const users = await User
		.query()
		.findById(req.params.id)

	res.send({ data: { users } });
}

export async function postUser
	(req: Request, res: Response, next: NextFunction): Promise<void> {
	userSchema.validate(req.body)
		.catch(err => next(err))
	const user = await User
		.query()
		.insertAndFetch(req.body)

	res.send({ data: { user } })
}

export async function patchUser
	(req: Request, res: Response, next: NextFunction): Promise<void> {
	userSchema.validate(req.body)
		.catch(err => next(err))
	const id = req.params.id
	const user = await User
		.query()
		.patchAndFetchById(id, req.body)

	res.send({ data: { user } })
}

export async function deleteUser
	(req: Request, res: Response): Promise<void> {
	const id = req.params.id
	const queryResult = await User
		.query()
		.deleteById(id)

	res.sendStatus(200);
}

export async function signup
	(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign up")
	const { first_name, last_name, email, password, confPassword } = req.body;
	if (password !== confPassword) {
		logger.error("An error occured while trying to sign up: Password and Password confirmation do not match");
		res
			.status(400)
			.json({ errors: [{ msg: "Password and Password confirmation do not match" }] })
	}
	// hash password
	const salt = await bcrypt.genSalt();
	const hashedPassword = await bcrypt.hash(password, salt);
	// check if the user already exists
	const user = await User
		.query()
		.findOne({ email })

	if (user) {
		logger.error(`A user couldn't sign up since ${email} already exists`)
		res.status(409).json("User with such email already exists");
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
	const registeredUser = await User
		.query()
		.insertAndFetch(newUser)

	logger.info(`A user signed up as ${first_name} ${last_name} ${email}`)
	res.send({ data: { user: registeredUser } });
}

export async function signin
	(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign in")
	// find user
	const user = await User
		.query()
		.findOne({ email: req.body.email })


	// check is user exists
	if (!user) {
		logger.error(`An error occured while trying to sign is, user with the email ${req.body.email} doesn't exist`)
		res
			.status(404)
			.json({ errors: [{ msg: "User not found" }] });
	}
	// check password
	const match = await bcrypt.compare(req.body.password, user.password_hash);
	// send an error message is password is incorrect
	if (!match) {
		logger.error("An error occured while trying to sign in: Wrong password is provided")
		res
			.status(400)
			.json({ errors: [{ msg: "Wrong Password" }] })
	}
	const { id, email } = user;
	const userId = id;

	// generate access and refresh tokens
	const accessToken = jwt.sign(
		{ userId, email },
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '15s' }
	);

	const refreshToken = jwt.sign(
		{ userId, email },
		process.env.REFRESH_TOKEN_SECRET,
		{ expiresIn: '7d' }
	);

	// add refresh token to a user in database
	const signedInUser = await User
		.query()
		.patchAndFetchById(userId, { refresh_token: refreshToken })


	// add the refresh token to the response as a cookie
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	logger.info(`A user is logged in as: ${email}`)
	res.json({ data: { accessToken, signedInUser } });
}

export async function signout
	(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign out")

	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		logger.error("An error occured while trying to sign out: No refresh token is provided")
		res.sendStatus(204)
	}

	// query a user by refresh token and check if it exists
	const user = await User
		.query()
		.findOne({ refresh_token: refreshToken })


	if (!user) {
		logger.error("An error occured while trying to sign out: User with provided refresh token is not signed in")
		res.sendStatus(204)
	}

	// remove the refresh token from the user in database
	await User
		.query()
		.where("refresh_token", refreshToken)
		.patch({ refresh_token: null })


	// remove the refresh token cookie from the user
	res.clearCookie('refreshToken');
	logger.info(`User with the username ${user.email} is signed out`)
	res.sendStatus(200);
}

export async function handleRefreshToken
	(req: Request, res: Response): Promise<void> {
	logger.info("User is trying to refresh a token...");
	const cookies = req.cookies;
	// check if a refresh token was provided
	if (!cookies?.refreshToken) {
		logger.error("A token cannot be refreshed as no refresh token provided")
		res.sendStatus(401);
	}
	const refreshToken = cookies.refreshToken;

	const foundUser = await User
		.query()
		.findOne("refresh_token", refreshToken)


	if (!foundUser) {
		logger.error("A token cannot be refreshed, as the user hasn't been validly authenticated")
		res.sendStatus(403);
	} //Forbidden 

	// evaluate jwt 
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err: JsonWebTokenError, decoded: JwtPayload) => {
			if (err || foundUser.email !== decoded.email) {
				logger.error("An error occured while verifying the privided refresh token")
				res.sendStatus(403)
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
