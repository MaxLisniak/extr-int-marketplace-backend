import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  userSignInPayloadType,
  userCreatePayloadType,
  userUpdatePayloadType,
  userFindOnePayloadType
} from "../validationSchemas/user";
import User from "../models/User";
import Favorite from "../models/Favorite";
import logger from "../logger";
import { favoriteType } from "../validationSchemas/favorite";


export function findUsers() {
  const query = User.query()
  return query
}

export function findUserById(payload: userFindOnePayloadType) {
  const query = User
    .query()
    .findById(payload.id)

  if (payload.include_favorite_products) {
    query.withGraphFetched('favoriteProducts')

  }
  return query
}

export function updateUser(payload: userUpdatePayloadType) {
  const { id, ...body } = payload
  const query = User
    .query()
    .patchAndFetchById(id, body)
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

export function findUserByEmail(email: string) {
  const query = User
    .query()
    .findOne({ email })
  return query
}

export function findUserByRefreshToken(refresh_token: string) {
  const query = User
    .query()
    .findOne({ refresh_token })
  return query
}

export function createUser(payload: userCreatePayloadType) {
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

export async function handleRefreshToken(refresh_token: string) {
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

export async function addFavoriteProduct(payload: favoriteType) {
  const { user_id, product_id } = payload
  const favorite = await Favorite
    .query()
    .findOne({ user_id, product_id })
  if (favorite) throw new Error("Can't add to favorite")
  const query = User.relatedQuery("favoriteProducts")
    .for(user_id)
    .relate(product_id)
  return query
}

export async function removeFavoriteProduct(payload: favoriteType) {
  const { user_id, product_id } = payload
  const favorite = await Favorite
    .query()
    .findOne({ user_id, product_id })
  if (!favorite) throw new Error("Can't remove from favorite")
  const query = User.relatedQuery("favoriteProducts")
    .for(user_id)
    .unrelate()
    .where('products.id', product_id)
  return query
}

export async function signOut(refresh_token: string) {
  // query a user by refresh token and check if it exists
  const foundUser = await findUserByRefreshToken(refresh_token)

  if (!foundUser) {
    throw new Error("An error occured while trying to sign out: User with provided refresh token is not signed in")
  }

  // remove the refresh token from the user in database
  await removeRefreshToken(refresh_token)
  logger.info(`User with the username ${foundUser.email} is signed out`)
}

export async function signIn(payload: userSignInPayloadType) {
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
    { id: userId, refresh_token: refreshToken } as userUpdatePayloadType
  )
  logger.info(`A user is logged in as: ${email}`)

  return { signedInUser, accessToken, refreshToken }
}

export async function signUp(payload: userCreatePayloadType) {
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
  const registeredUser = await createUser(newUserPayload as userCreatePayloadType)
  logger.info(`A user signed up as ${registeredUser.first_name} ${registeredUser.last_name} ${registeredUser.email}`)
  return registeredUser
}