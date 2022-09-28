import * as yup from 'yup';

export const characteristicValueCreatePayloadSchema = yup.object().shape({
  value: yup
    .string()
    .min(0)
    .max(64)
    .required(),
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

export const characteristicValueUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
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

export const characteristicValueFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})


export type characteristicValueFindOnePayloadType = yup.InferType<typeof characteristicValueFindOnePayloadSchema>
export type characteristicValueUpdatePayloadType = yup.InferType<typeof characteristicValueUpdatePayloadSchema>
export type characteristicValueCreatePayloadType = yup.InferType<typeof characteristicValueCreatePayloadSchema>