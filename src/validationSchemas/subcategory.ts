import * as yup from 'yup';

export const subcategorySchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(0)
    .max(32),
  category_id: yup
    .number()
    .integer()
    .positive()
    .required(),
})
