import * as yup from 'yup';
import User from '../models/users.model';
import { id, limit, offset } from './common.validation';
import Product from '../models/products.model';
import Favorite from '../models/favorites.model';

const email = yup
  .string()
  .email()
  .max(64)

const first_name = yup
  .string()
  .min(1)
  .max(64)

const last_name = yup
  .string()
  .min(1)
  .max(64)

const password = yup
  .string()

const password_hash = yup
  .string()

const is_admin = yup
  .boolean()

const refresh_token = yup
  .string()

const findPayload = yup.object().shape({
  limit,
  offset,
  email,
  first_name,
  last_name,
})

const findByIdPayload = yup.object().shape({
  id: id
    .required(),
})

const createPayload = yup.object().shape({
  email: email
    .required(),
  first_name: first_name
    .required(),
  last_name: last_name,
  password: password
    .required(),
  password_conf: password
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match.'),
  password_hash: password_hash,
  is_admin: is_admin,
})

const updateByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'userUpdate-entryDoesNotExist',
      "Can't update user, it does not exist",
      async value => Boolean(await User.query().findById(value))
    ),
  email: email,
  first_name: first_name,
  last_name: last_name,
  password_hash: password_hash,
  is_admin: is_admin,
  refresh_token: refresh_token,
})

const signInPayload = yup.object().shape({
  email: email,
  password: password
    .required(),
  password_hash: password_hash
})

const deleteByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'userDelete-entryDoesNotExist',
      "Can't delete user, it does not exist",
      async value => Boolean(await User.query().findById(value))
    )
})

const addFavoriteProductPayload = yup.object().shape({
  product_id: id
    .required()
    .test(
      'favoriteAdd-productDoesNotExist',
      "Can't add to favorite, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  user_id: id
    .required()
    .test(
      'favoriteAdd-userDoesNotExist',
      "Can't add to favorite, specified user does not exist",
      async value => Boolean(await User.query().findById(value))
    )
    .test(
      'favoriteAdd-alreadyFavorite',
      "Can't add to favorite, the product is already user's favorite",
      async function () {
        const { user_id, product_id } = this.parent;
        return !await Favorite.query().findOne({ user_id, product_id })
      }
    )
})

const removeFavoriteProductPayload = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'favoriteRemove-productDoesNotExist',
      "Can't remove from favorite, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  user_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'favoriteRemove-userDoesNotExist',
      "Can't remove from favorite, specified user does not exist",
      async value => Boolean(await User.query().findById(value))
    )
    .test(
      'favoriteRemove-notFavorite',
      "Can't remove from favorite, the product is not user's favorite",
      async function () {
        const { user_id, product_id } = this.parent;
        return Boolean(await Favorite.query().findOne({ user_id, product_id }))
      }
    )
})

export const UsersValidationSchemas = {
  findPayload,
  findByIdPayload,
  createPayload,
  updateByIdPayload,
  deleteByIdPayload,
  signInPayload,
  addFavoriteProductPayload,
  removeFavoriteProductPayload,
}
