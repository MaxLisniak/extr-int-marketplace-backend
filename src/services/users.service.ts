import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  UserSignInPayload,
  UserCreatePayload,
  UserUpdatePayload,
} from "../lib/types/users.types"
import User from "../models/User";
import logger from "../logger";


async function findUsers() {
  return await User.query()
}

async function findUserById(id: number) {
  return await User
    .query()
    .findById(id)
}

async function updateUser(id: number, object: UserUpdatePayload) {
  return await User
    .query()
    .patchAndFetchById(id, object)
}

async function deleteUser(id: number) {
  return await User
    .query()
    .deleteById(id)
}

async function generatePasswordHash(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword
}

async function findUserByEmail(email: string) {
  return await User
    .query()
    .findOne({ email })
}

async function findUserByRefreshToken(refresh_token: string) {
  return await User
    .query()
    .findOne({ refresh_token })
}

async function createUser(payload: UserCreatePayload) {
  return await User
    .query()
    .insertAndFetch(payload)
}

async function removeRefreshToken(refresh_token: string) {
  return await User
    .query()
    .where("refresh_token", refresh_token)
    .patch({ refresh_token: null })
}

async function handleRefreshToken(refresh_token: string) {
  const foundUser = await findUserByRefreshToken(refresh_token)
  if (!foundUser) {
    throw new Error("A token cannot be refreshed, as the user hasn't been validly authenticated")
  }
  let accessToken;
  // evaluate jwt 
  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    (err: JsonWebTokenError, decoded: JwtPayload) => {
      if (err || foundUser.email !== decoded.email) {
        throw new Error("An error occured while verifying the privided refresh token")
      }

      // new access token
      accessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15s' },
      );
      logger.info(`The access token is refreshed`)
    }
  );
  return accessToken
}

async function signOut(refresh_token: string) {
  // query a user by refresh token and check if it exists
  const foundUser = await findUserByRefreshToken(refresh_token)

  if (!foundUser) {
    throw new Error("An error occured while trying to sign out: User with provided refresh token is not signed in")
  }

  // remove the refresh token from the user in database
  await removeRefreshToken(refresh_token)
  logger.info(`User with the username ${foundUser.email} is signed out`)
}

async function signIn(payload: UserSignInPayload) {
  // find user
  const foundUser = await findUserByEmail(payload.email)

  if (!foundUser) {
    throw new Error(`An error occured while trying to sign is, user with the email ${payload.email} doesn't exist`)
  }

  // check password
  const match = await bcrypt.compare(payload.password, foundUser.password_hash);

  // send an error message is password is incorrect
  if (!match) {
    throw new Error("An error occured while trying to sign in: Wrong password is provided")
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
  const signedInUser = await updateUser(
    userId, { refresh_token: refreshToken } as UserUpdatePayload
  )
  logger.info(`A user is logged in as: ${email}`)

  return { signedInUser, accessToken, refreshToken }
}

async function signUp(payload: UserCreatePayload) {
  // generate hashed password
  const hashedPassword = await generatePasswordHash(payload.password)

  // find user 
  const foundUser = await findUserByEmail(payload.email)

  if (foundUser) {
    throw new Error(`A user couldn't sign up since ${payload.email} already exists`)
  }
  const newUserPayload = {
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password_hash: hashedPassword,
    is_admin: false,
  };
  const registeredUser = await createUser(newUserPayload as UserCreatePayload)
  logger.info(`A user signed up as ${registeredUser.first_name} ${registeredUser.last_name} ${registeredUser.email}`)
  return registeredUser
}

export const UsersService = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
  handleRefreshToken,
  signUp,
  signIn,
  signOut
}