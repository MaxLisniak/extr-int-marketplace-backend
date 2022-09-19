import * as yup from 'yup';

export const characteristicValueSchema = yup.object().shape({
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