import * as yup from 'yup';

export const commentSchema = yup.object().shape({
  text: yup
    .string()
    .min(1)
    .max(512),
  user_id: yup
    .number()
    .integer()
    .positive(),
  product_id: yup
    .number()
    .integer()
    .positive(),
  created: yup
    .date(),
});
