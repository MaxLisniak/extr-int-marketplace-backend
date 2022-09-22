import * as yup from 'yup';

export const characteristicNameSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
  name: yup
    .string()
    .min(1)
    .max(32),
  category_id: yup
    .number()
    .integer()
    .positive()
});

export type characteristicNameType = yup.InferType<typeof characteristicNameSchema>