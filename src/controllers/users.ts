import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import logger from "../logger";
import { userSchema, userType } from "../validationSchemas/user";
import { addFavoriteProduct, deleteUser, generatePasswordHash, getSingleUserByEmail, getSingleUserByRefreshToken, getUserById, getUsers, handleRefreshToken, patchUser, postUser, removeFavoriteProduct, removeRefreshToken, signIn, signOut, signUp } from "../services/users";
import { favoriteSchema } from "../validationSchemas/favorite";

export async function getUsersController(req: Request, res: Response): Promise<void> {
	const users = await getUsers()
	res.json({ data: users });
}

export async function getUserByIdController(req: Request, res: Response): Promise<void> {
	const { include_favorite_products } = req.query;
	const paramsPayload = userSchema.validateSync(req.params)
	const user = await getUserById(
		paramsPayload.id,
		include_favorite_products === "true"
	)
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

export async function addFavoriteProductController(req: Request, res: Response): Promise<void> {
	const bodyPayload = favoriteSchema.validateSync(req.body);
	await addFavoriteProduct(bodyPayload.user_id, bodyPayload.product_id)
	res.sendStatus(200)
}

export async function removeFavoriteProductController(req: Request, res: Response): Promise<void> {
	const bodyPayload = favoriteSchema.validateSync(req.body);
	await removeFavoriteProduct(bodyPayload.user_id, bodyPayload.product_id)
	res.sendStatus(200)
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
	const registeredUser = await signUp(bodyPayload)
	res.json({ data: registeredUser });
}

export async function signInController(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign in")
	const bodyPayload = userSchema.validateSync(req.body)

	const { signedInUser, accessToken, refreshToken } = await signIn(bodyPayload)

	// add the refresh token to the response as a cookie
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
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

	await signOut(refreshToken)

	// remove the refresh token cookie from the user
	res.clearCookie('refreshToken');
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
	const accessToken = await handleRefreshToken(refreshToken)
	res.json({ accessToken })
}
