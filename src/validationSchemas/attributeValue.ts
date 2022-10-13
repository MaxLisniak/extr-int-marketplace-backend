import * as yup from 'yup';

export const attributeValueCreatePayloadSchema = yup.object().shape({
  value: yup
    .string()
    .min(0)
    .max(64)
    .required(),
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const attributeValueUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  value: yup
    .string()
    .min(0)
    .max(64),
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const attributeValueFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})


export type attributeValueFindOnePayloadType = yup.InferType<typeof attributeValueFindOnePayloadSchema>
export type attributeValueUpdatePayloadType = yup.InferType<typeof attributeValueUpdatePayloadSchema>
export type attributeValueCreatePayloadType = yup.InferType<typeof attributeValueCreatePayloadSchema>