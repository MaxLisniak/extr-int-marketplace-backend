import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  UserSignInPayload,
  UserCreatePayload,
  UserUpdateByIdPayload,
  UserFindPayload,
} from "../lib/types/users.types"
import User from "../models/users.model";
import logger from "../logger";


async function find(params: UserFindPayload) {
  const {
    limit,
    offset,
    first_name,
    last_name,
    email,
    is_admin
  } = params

  const query = User
    .query()

  if (first_name) {
    query.where({ first_name })
  }
  if (last_name) {
    query.where({ last_name })
  }
  if (email) {
    query.where({ email })
  }
  if (is_admin) {
    query.where({ is_admin })
  }
  if (limit) {
    query.limit(limit)
  }
  if (offset) {
    query.offset(offset)
  }

  return await query
}

async function findById(id: number) {
  return await User
    .query()
    .findById(id)
}

async function updateById(id: number, payload: UserUpdateByIdPayload) {
  return await User
    .query()
    .patchAndFetchById(id, payload)
}

async function deleteById(id: number) {
  return await User
    .query()
    .deleteById(id)
}

async function generatePasswordHash(password: string) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword
}

async function create(payload: UserCreatePayload) {
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
  const foundUser = await User
    .query()
    .findOne({ refresh_token })

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
  const foundUser = await User
    .query()
    .findOne({ refresh_token })

  if (!foundUser) {
    throw new Error("An error occured while trying to sign out: User with provided refresh token is not signed in")
  }

  // remove the refresh token from the user in database
  await removeRefreshToken(refresh_token)
  logger.info(`User with the username ${foundUser.email} is signed out`)
}

async function signIn(payload: UserSignInPayload) {
  // find user
  const foundUser = await User
    .query()
    .findOne({ email: payload.email })

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
  const signedInUser = await updateById(
    userId, { refresh_token: refreshToken } as UserUpdateByIdPayload
  )
  logger.info(`A user is logged in as: ${email}`)

  return { signedInUser, accessToken, refreshToken }
}

async function signUp(payload: UserCreatePayload) {
  // generate hashed password
  const hashedPassword = await generatePasswordHash(payload.password)

  // find user 
  const foundUser = await User
    .query()
    .findOne({ email: payload.email })

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
  const registeredUser = await create(newUserPayload as UserCreatePayload)
  logger.info(`A user signed up as ${registeredUser.first_name} ${registeredUser.last_name} ${registeredUser.email}`)
  return registeredUser
}

export const UsersService = {
  find,
  findById,
  updateById,
  deleteById,
  handleRefreshToken,
  signUp,
  signIn,
  signOut
}