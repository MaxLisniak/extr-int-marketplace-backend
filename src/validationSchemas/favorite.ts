import * as yup from 'yup';
import Favorite from '../models/Favorite';
import Product from '../models/Product';
import User from '../models/User';


export const addFavoritePayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'favoriteAdd-productDoesNotExist',
      "Can't add to favorite, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  user_id: yup
    .number()
    .integer()
    .positive()
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

export const removeFavoritePayloadSchema = yup.object().shape({
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

export const favoriteProductsFindPayloadSchema = yup.object().shape({
  user_id: yup
    .number()
    .integer()
    .positive()
    .required()
});

export type removeFavoritePayloadType = yup.InferType<typeof removeFavoritePayloadSchema>
export type addFavoritePayloadType = yup.InferType<typeof addFavoritePayloadSchema>
export type favoriteProductsFindPayloadType = yup.InferType<typeof favoriteProductsFindPayloadSchema>