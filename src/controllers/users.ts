import { Request, Response } from "express";
import logger from "../logger";
import {
	userCreatePayloadSchema,
	userDeletePayloadSchema,
	userFindOnePayloadSchema,
	userSignInPayloadSchema,
	userUpdatePayloadSchema,
} from "../validationSchemas/user";
import {
	findUsers,
	findUserById,
	updateUser,
	deleteUser,
	signIn,
	signOut,
	signUp,
	handleRefreshToken,
} from "../services/users";

export async function findUsersController(req: Request, res: Response): Promise<void> {
	const users = await findUsers()
	res.json({ data: users });
}

export async function findUserByIdController(req: Request, res: Response): Promise<void> {
	const payload = userFindOnePayloadSchema
		.validateSync(req.params, { stripUnknown: true })
	const user = await findUserById(payload.id)
	res.json({ data: user });
}

export async function updateUserController(req: Request, res: Response): Promise<void> {
	const payload = await userUpdatePayloadSchema
		.validate({ ...req.body, ...req.params }, { stripUnknown: true })
	const user = await updateUser(payload.id, payload)
	res.json({ data: user })
}

export async function deleteUserController(req: Request, res: Response): Promise<void> {
	const paramsPayload = await userDeletePayloadSchema
		.validate(req.params, { stripUnknown: true })
	await deleteUser(paramsPayload.id)
	res.sendStatus(200);
}

export async function signUpController(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign up")
	const payload = userCreatePayloadSchema
		.validateSync(req.body, { stripUnknown: true })
	const registeredUser = await signUp(payload)
	res.json({ data: registeredUser });
}

export async function signInController(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign in")
	const payload = userSignInPayloadSchema
		.validateSync(req.body, { stripUnknown: true })

	const { signedInUser, accessToken, refreshToken } = await signIn(payload)

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
	console.log(refreshToken)
	res.json({ accessToken })
}
