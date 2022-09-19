import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';


// check if the provided access token is valid
const verifyToken: RequestHandler = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		// The token is not provided
		console.error("Cannot verify the token, no token provided")
		return res.sendStatus(401)
	}
	const token = authHeader.split(' ')[1];
	// verify the access token provided
	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET,
		(err) => {
			if (err) {
				console.error("Token expired")
				return res.sendStatus(403)
			} //invalid token
			next();
		}
	);
}

export default verifyToken;
