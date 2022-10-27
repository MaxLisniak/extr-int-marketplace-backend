import Favorite from '../models/Favorite';
import * as yup from 'yup';
import User from '../models/User';

export const favoriteSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
  user_id: yup
    .number()
    .integer()
    .positive(),
  product_id: yup // TODO: там где ты используешь foreign ключи лучше проверить на существования продукта или пользователя, в этом случае ты будешь выдавать не фронт понятную ошибку
    .number()
    .integer()
    .positive()
});

export const addFavoriteSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  user_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test('test', "Can't add to favorite",
      async function () {
        const res = await Favorite
          .query()
          .findOne({ user_id: this.parent.user_id, product_id: this.parent.product_id })
        return res === undefined
      })
})

export const removeFavoriteSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  user_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test('test', "Can't remove from favorite",
      async function () {
        const res = await Favorite
          .query()
          .findOne({ user_id: this.parent.user_id, product_id: this.parent.product_id })
        return res !== undefined
      })
})

export const favoriteFindPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive(),
  user_id: yup
    .number()
    .integer()
    .positive()
});

export type favoriteType = yup.InferType<typeof addFavoriteSchema>
export type favoriteFindPayloadType = yup.InferType<typeof favoriteFindPayloadSchema>