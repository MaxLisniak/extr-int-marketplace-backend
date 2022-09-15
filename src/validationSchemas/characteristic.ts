import * as yup from 'yup';

export const characteristicSchema = yup.object().shape({
  value: yup
    .string()
    .required()
    .min(0)
    .max(64),
  characteristic_name_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
})
