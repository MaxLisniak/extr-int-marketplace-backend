import * as yup from 'yup';

export const attributeValueFindPayloadSchema = yup.object().shape({
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive()
})

export const attributeValueFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const attributeValueCreatePayloadSchema = yup.object().shape({
  value: yup
    .string()
    .min(1)
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
    .min(1)
    .max(64),
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
})


export type attributeValueFindPayloadType = yup.InferType<typeof attributeValueFindPayloadSchema>
export type attributeValueFindOnePayloadType = yup.InferType<typeof attributeValueFindOnePayloadSchema>
export type attributeValueCreatePayloadType = yup.InferType<typeof attributeValueCreatePayloadSchema>
export type attributeValueUpdatePayloadType = yup.InferType<typeof attributeValueUpdatePayloadSchema>