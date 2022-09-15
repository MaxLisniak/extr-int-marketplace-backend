import * as yup from 'yup';

export const commentSchema = yup.object().shape({
  text: yup
    .string()
    .required()
    .min(1)
    .max(512),
  user_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  created: yup
    .date()
    .required()
});
