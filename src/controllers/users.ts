import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import logger from "../logger";
import { userSchema, userType } from "../validationSchemas/user";
import { deleteUser, generatePasswordHash, getSingleUserByEmail, getSingleUserByRefreshToken, getUserById, getUsers, patchUser, postUser, removeRefreshToken } from "../services/users";

export async function getUsersController(req: Request, res: Response): Promise<void> {
	const users = await getUsers()
	res.json({ data: users });
}

export async function getUserByIdController(req: Request, res: Response): Promise<void> {
	const paramsPayload = userSchema.validateSync(req.params)
	const user = await getUserById(paramsPayload.id)
	res.json({ data: user });
}

export async function patchUserController(req: Request, res: Response, next: NextFunction): Promise<void> {
	const bodyPayload = userSchema.validateSync(req.body)
	const paramsPayload = userSchema.validateSync(req.params)
	const user = await patchUser(
		paramsPayload.id,
		bodyPayload
	)
	res.json({ data: user })
}

export async function deleteUserController(req: Request, res: Response): Promise<void> {
	const paramsPayload = userSchema.validateSync(req.params)
	await deleteUser(paramsPayload.id)
	res.sendStatus(200);
}

export async function signUpController(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign up")
	const bodyPayload = userSchema.validateSync(req.body)

	// comapare passwords
	if (bodyPayload.password !== bodyPayload.confPassword) {
		logger.error("An error occured while trying to sign up: Password and Password confirmation do not match");
		res.status(400).json({ errors: [{ msg: "Password and Password confirmation do not match" }] })
		return
	}

	// generate hashed password
	const hashedPassword = await generatePasswordHash(bodyPayload.password)

	// find user 
	const foundUser = await getSingleUserByEmail(bodyPayload.email)

	if (foundUser) {
		logger.error(`A user couldn't sign up since ${bodyPayload.email} already exists`)
		res.status(409).json({ errors: [{ msg: "User with such email already exists" }] })
		return
	}
	const newUserPayload = {
		first_name: bodyPayload.first_name,
		last_name: bodyPayload.last_name,
		email: bodyPayload.email,
		password_hash: hashedPassword,
		is_admin: false,
	};
	const registeredUser = await postUser(newUserPayload)
	logger.info(`A user signed up as ${registeredUser.first_name} ${registeredUser.last_name} ${registeredUser.email}`)
	res.json({ data: registeredUser });
}

export async function signInController(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign in")
	const bodyPayload = userSchema.validateSync(req.body)

	// find user
	const foundUser = await getSingleUserByEmail(bodyPayload.email)

	if (!foundUser) {
		logger.error(`An error occured while trying to sign is, user with the email ${bodyPayload.email} doesn't exist`)
		res.status(404).json({ errors: [{ msg: "User not found" }] });
		return
	}

	// check password
	const match = await bcrypt.compare(bodyPayload.password, foundUser.password_hash);

	// send an error message is password is incorrect
	if (!match) {
		logger.error("An error occured while trying to sign in: Wrong password is provided")
		res.status(400).json({ errors: [{ msg: "Wrong Password" }] })
	}

	const { id, email } = foundUser;
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
	const signedInUser = await patchUser(
		userId,
		{ refresh_token: refreshToken } as userType
	)

	// add the refresh token to the response as a cookie
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	logger.info(`A user is logged in as: ${email}`)
	res.json({ data: { accessToken, signedInUser } });
}

export async function signOutController(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign out")

	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		logger.error("An error occured while trying to sign out: No refresh token is provided")
		res.sendStatus(204)
		return
	}

	// query a user by refresh token and check if it exists
	const foundUser = await getSingleUserByRefreshToken(refreshToken)

	if (!foundUser) {
		logger.error("An error occured while trying to sign out: User with provided refresh token is not signed in")
		res.sendStatus(204)
		return
	}

	// remove the refresh token from the user in database
	await removeRefreshToken(refreshToken)

	// remove the refresh token cookie from the user
	res.clearCookie('refreshToken');
	logger.info(`User with the username ${foundUser.email} is signed out`)
	res.sendStatus(200);
}

export async function handleRefreshTokenController(req: Request, res: Response): Promise<void> {
	logger.info("User is trying to refresh a token...");
	const cookies = req.cookies;

	// check if a refresh token was provided
	if (!cookies?.refreshToken) {
		logger.error("A token cannot be refreshed as no refresh token provided")
		res.sendStatus(401);
		return
	}
	const refreshToken = cookies.refreshToken;

	const foundUser = await getSingleUserByRefreshToken(refreshToken)

	if (!foundUser) {
		logger.error("A token cannot be refreshed, as the user hasn't been validly authenticated")
		res.sendStatus(403);
		return
	} //Forbidden 

	// evaluate jwt 
	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err: JsonWebTokenError, decoded: JwtPayload) => {
			if (err || foundUser.email !== decoded.email) {
				logger.error("An error occured while verifying the privided refresh token")
				res.sendStatus(403)
				return
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
