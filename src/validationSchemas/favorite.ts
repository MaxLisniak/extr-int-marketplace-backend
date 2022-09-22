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
  product_id: yup
    .number()
    .integer()
    .positive()
});

export type favoriteType = yup.InferType<typeof favoriteSchema>