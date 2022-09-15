import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(1)
    .max(64),
  description: yup
    .string()
    .required()
    .min(1)
    .max(512),
  image_url: yup
    .string()
    .required()
    .min(1),
  subcategory_id: yup
    .number()
    .integer()
    .positive()
    .required(),
});
