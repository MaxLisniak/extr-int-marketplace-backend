import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
  name: yup
    .string()
    .min(1)
    .max(32),
  parent_id: yup
    .number()
    .integer()
    .positive()
});

export type categoryType = yup.InferType<typeof categorySchema>