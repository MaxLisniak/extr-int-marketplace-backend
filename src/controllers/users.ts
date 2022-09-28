import { Request, Response } from "express";
import logger from "../logger";
import {
	userCreatePayloadSchema,
	userFindOnePayloadSchema,
	userSignInPayloadSchema,
	userUpdatePayloadSchema,
} from "../validationSchemas/user";
import { favoriteSchema } from "../validationSchemas/favorite";
import {
	findUsers,
	findUserById,
	updateUser,
	deleteUser,
	signIn,
	signOut,
	signUp,
	handleRefreshToken,
	addFavoriteProduct,
	removeFavoriteProduct,
} from "../services/users";
import { idSchema } from "../validationSchemas/id";

export async function findUsersController(req: Request, res: Response): Promise<void> {
	const users = await findUsers()
	res.json({ data: users });
}

export async function findUserByIdController(req: Request, res: Response): Promise<void> {
	const payload = userFindOnePayloadSchema
		.validateSync({ ...req.query, ...req.params }, { stripUnknown: true })
	const user = await findUserById(payload)
	res.json({ data: user });
}

export async function updateUserController(req: Request, res: Response): Promise<void> {
	const payload = userUpdatePayloadSchema
		.validateSync({ ...req.body, ...req.params }, { stripUnknown: true })
	const user = await updateUser(payload)
	res.json({ data: user })
}

export async function deleteUserController(req: Request, res: Response): Promise<void> {
	const paramsPayload = idSchema.validateSync(req.params, { stripUnknown: true })
	await deleteUser(paramsPayload.id)
	res.sendStatus(200);
}

export async function addFavoriteProductController(req: Request, res: Response): Promise<void> {
	const payload = favoriteSchema.validateSync(req.body, { stripUnknown: true });
	await addFavoriteProduct(payload)
	res.sendStatus(200)
}

export async function removeFavoriteProductController(req: Request, res: Response): Promise<void> {
	const payload = favoriteSchema.validateSync(req.body, { stripUnknown: true });
	await removeFavoriteProduct(payload)
	res.sendStatus(200)
}

export async function signUpController(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign up")
	const payload = userCreatePayloadSchema
		.validateSync(req.body, { stripUnknown: true })

	// comapare passwords
	if (payload.password !== payload.confPassword) {
		logger.error("An error occured while trying to sign up: Password and Password confirmation do not match");
		res.status(400).json({ errors: [{ msg: "Password and Password confirmation do not match" }] })
		return
	}
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
