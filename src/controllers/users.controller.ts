import { Request, Response } from "express";
import logger from "../logger";
import { UsersService } from "../services/users.service";
import { UsersValidationSchemas } from "../validation-schemas/users.validation";
import { AddFavoriteProductPayload, RemoveFavoriteProductPayload } from "../lib/types/users.types";


async function find(req: Request, res: Response): Promise<void> {
	const payload = await UsersValidationSchemas.findPayload
		.validate(req.query, { stripUnknown: true })

	const users = await UsersService.find(payload)

	res.json({ data: users });
}

async function findById(req: Request, res: Response): Promise<void> {
	const payload = await UsersValidationSchemas.findByIdPayload
		.validate(req.params, { stripUnknown: true })

	const user = await UsersService.findById(payload.id)

	res.json({ data: user });
}

async function findByToken(req: Request, res: Response) {
	const refreshToken = req.cookies.refreshToken
	let user = await UsersService.findByRefreshToken(refreshToken)
	res.json({ data: user })
}

async function updateByToken(req: Request, res: Response): Promise<void> {
	const payload = await UsersValidationSchemas.updateByIdPayload
		.validate(req.body, { stripUnknown: true })

	const refreshToken = req.cookies.refreshToken
	let user = await UsersService.findByRefreshToken(refreshToken)

	user = await UsersService.updateById(user.id, payload)

	res.json({ data: user })
}

async function deleteByToken(req: Request, res: Response): Promise<void> {

	const refreshToken = req.cookies.refreshToken
	const user = await UsersService.findByRefreshToken(refreshToken)

	await UsersService.signOut(refreshToken)
	await UsersService.deleteById(user.id)

	res.sendStatus(200);
}

async function signUp(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign up")

	const payload = await UsersValidationSchemas.createPayload
		.validate(req.body, { stripUnknown: true })

	const registeredUser = await UsersService.signUp(payload)

	res.json({ data: registeredUser });
}

async function signIn(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign in")

	const payload = await UsersValidationSchemas.signInPayload
		.validate(req.body, { stripUnknown: true })

	const { signedInUser, accessToken, refreshToken } = await UsersService.signIn(payload)

	// add the refresh token to the response as a cookie
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	res.json({ data: { accessToken, signedInUser } });
}

async function signOut(req: Request, res: Response): Promise<void> {
	logger.info("A user is trying to sign out")

	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		logger.error("An error occured while trying to sign out: No refresh token is provided")
		res.sendStatus(204)
		return
	}

	await UsersService.signOut(refreshToken)

	// remove the refresh token cookie from the user
	res.clearCookie('refreshToken');
	res.sendStatus(200);
}

async function handleRefreshToken(req: Request, res: Response): Promise<void> {
	logger.info("User is trying to refresh a token...");

	const cookies = req.cookies;
	// check if a refresh token was provided
	if (!cookies?.refreshToken) {
		logger.error("A token cannot be refreshed as no refresh token provided")
		res.sendStatus(401);
		return
	}

	const refreshToken = cookies.refreshToken;
	const accessToken = await UsersService.handleRefreshToken(refreshToken)

	res.json({ accessToken })
}

async function addFavoriteProduct(req: Request, res: Response): Promise<void> {
	const payload: Partial<AddFavoriteProductPayload & { user_id: number }> =
		await UsersValidationSchemas.addFavoriteProductPayload
			.validate(req.params, { stripUnknown: true })

	const refreshToken = req.cookies.refreshToken
	const user = await UsersService.findByRefreshToken(refreshToken)
	payload.user_id = user.id

	await UsersService.addFavoriteProduct(payload)
	res.sendStatus(200)
}

async function removeFavoriteProduct(req: Request, res: Response): Promise<void> {
	const payload: Partial<RemoveFavoriteProductPayload & { user_id: number }> =
		await UsersValidationSchemas.removeFavoriteProductPayload
			.validate(req.params, { stripUnknown: true });

	const refreshToken = req.cookies.refreshToken
	const user = await UsersService.findByRefreshToken(refreshToken)
	payload.user_id = user.id

	await UsersService.removeFavoriteProduct(payload)
	res.sendStatus(200)
}

export const UsersController = {
	find,
	findById,
	findByToken,
	updateByToken,
	deleteByToken,
	signUp,
	signIn,
	signOut,
	handleRefreshToken,
	addFavoriteProduct,
	removeFavoriteProduct,
}