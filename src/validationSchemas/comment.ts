import * as yup from 'yup';

export const commentSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
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
    .string(),
});

export type commentType = yup.InferType<typeof commentSchema>