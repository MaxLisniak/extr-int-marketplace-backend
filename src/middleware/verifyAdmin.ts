import { RequestHandler } from "express";
import { UsersService } from "../services/users.service";

const verifyAdmin: RequestHandler = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken
  const user = await UsersService.findByRefreshToken(refreshToken)

  if (!user.is_admin) {
    return res.sendStatus(403)
  }
  next()
}

export default verifyAdmin;