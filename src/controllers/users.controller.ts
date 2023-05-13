import { Request, Response } from "express";
import logger from "../logger";
import { UsersService } from "../services/users.service";
import { UsersValidationSchemas } from "../validation-schemas/users.validation";


async function find(req: Request, res: Response): Promise<void> {
	const payload = await UsersValidationSchemas.findPayload
		.validate(req.params, { stripUnknown: true })

	const users = await UsersService.find(payload)

	res.json({ data: users });
}

async function findById(req: Request, res: Response): Promise<void> {
	const payload = await UsersValidationSchemas.findByIdPayload
		.validate(req.params, { stripUnknown: true })

	const user = await UsersService.findById(payload.id)

	res.json({ data: user });
}

async function updateById(req: Request, res: Response): Promise<void> {
	const payload = await UsersValidationSchemas.updateByIdPayload
		.validate({ ...req.body, ...req.params }, { stripUnknown: true })

	const user = await UsersService.updateById(payload.id, payload)

	res.json({ data: user })
}

async function deleteById(req: Request, res: Response): Promise<void> {
	const payload = await UsersValidationSchemas.deleteByIdPayload
		.validate(req.params, { stripUnknown: true })

	await UsersService.deleteById(payload.id)

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

export const UsersController = {
	find,
	findById,
	updateById,
	deleteById,
	signUp,
	signIn,
	signOut,
	handleRefreshToken,
}