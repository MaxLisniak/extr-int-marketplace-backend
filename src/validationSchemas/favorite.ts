import Favorite from '../models/Favorite';
import * as yup from 'yup';

// export const favoriteSchema = yup.object().shape({
//   id: yup
//     .number()
//     .integer()
//     .positive(),
//   user_id: yup
//     .number()
//     .integer()
//     .positive(),
//   product_id: yup // TODO: там где ты используешь foreign ключи лучше проверить на существования продукта или пользователя, в этом случае ты будешь выдавать не фронт понятную ошибку
//     .number()
//     .integer()
//     .positive()
// });

export const addFavoritePayloadSchema = yup.object().shape({
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
    .test('favoriteAdd', "Can't add to favorite",
      async function () {
        const res = await Favorite
          .query()
          .findOne({ user_id: this.parent.user_id, product_id: this.parent.product_id })
        return res === undefined
      })
})

export const removeFavoritePayloadSchema = yup.object().shape({
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
    .test('favoriteRemove', "Can't remove from favorite",
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

export type removeFavoritePayloadType = yup.InferType<typeof removeFavoritePayloadSchema>
export type addFavoritePayloadType = yup.InferType<typeof addFavoritePayloadSchema>
export type favoriteFindPayloadType = yup.InferType<typeof favoriteFindPayloadSchema>