import * as yup from 'yup';

export const characteristicValueSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
  value: yup
    .string()
    .min(0)
    .max(64),
  characteristic_name_id: yup
    .number()
    .integer()
    .positive(),
  product_id: yup
    .number()
    .integer()
    .positive(),
})

export type characteristicValueType = yup.InferType<typeof characteristicValueSchema>