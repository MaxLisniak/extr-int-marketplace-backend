import { userType } from "../validationSchemas/user";
import User from "../models/User";
import logger from "../logger";
import bcrypt from "bcrypt";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";


export function getUsers() {
  const query = User.query()
  return query
}

export function getUserById(id: number) {
  const query = User
    .query()
    .findById(id)
  return query
}

export function patchUser(
  id: number,
  paylaod: userType
) {
  const query = User
    .query()
    .patchAndFetchById(id, paylaod)
  return query
}

export function deleteUser(id: number) {
  const query = User
    .query()
    .deleteById(id)
  return query
}

export async function generatePasswordHash(password: string) {
  // hash password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword
}

export function getSingleUserByEmail(email: string) {
  const query = User
    .query()
    .findOne({ email })
  return query
}

export function getSingleUserByRefreshToken(refresh_token: string) {
  const query = User
    .query()
    .findOne({ refresh_token })
  return query
}

export function postUser(payload: {
  first_name: string,
  last_name: string,
  email: string,
  is_admin: boolean,
  password_hash: string
}) {
  const query = User
    .query()
    .insertAndFetch(payload)
  return query
}

export function generateAccessToken(
  payload: {},
  expiresIn: string
) {
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn }
  );
  return accessToken
}

export function removeRefreshToken(refresh_token: string) {
  const query = User
    .query()
    .where("refresh_token", refresh_token)
    .patch({ refresh_token: null })
  return query
}