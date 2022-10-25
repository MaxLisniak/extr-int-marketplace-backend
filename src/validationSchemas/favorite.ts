import * as yup from 'yup';

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

export const favoriteFindPayloadSchema = yup.object().shape({
  user_id: yup
    .number()
    .integer()
    .positive(),
});

export type favoriteType = yup.InferType<typeof favoriteSchema>
export type favoriteFindPayloadType = yup.InferType<typeof favoriteFindPayloadSchema>