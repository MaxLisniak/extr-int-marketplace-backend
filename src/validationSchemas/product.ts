import * as yup from 'yup';

export const productSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
  name: yup
    .string()
    .min(1)
    .max(64),
  description: yup
    .string()
    .min(1)
    .max(512),
  image_url: yup
    .string()
    .min(1),
  category_id: yup
    .number()
    .integer()
    .positive(),
  price: yup
    .number()
    .integer()
    .positive(),
});

export type productType = yup.InferType<typeof productSchema>
