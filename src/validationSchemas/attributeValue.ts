import AttributeName from '../models/AttributeName';
import AttributeValue from '../models/AttributeValue';
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
    .required()
    .test(
      'attributeValueCreate-attributeNameDoesNotExist',
      "Can't create attribute, specified attribute name does not exist",
      async value => Boolean(await AttributeName.query().findById(value))
    )
})

export const attributeValueUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeValueUpdate-entryDoesNotExist',
      "Can't update attribute, it does not exist",
      async value => Boolean(await AttributeName.query().findById(value))
    ),
  value: yup
    .string()
    .min(1)
    .max(64),
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
    .test(
      'attributeValueUpdate-AttributeNameIdDoesNotExist',
      "Can't update attribute, specified attribute name does not exist",
      async value => !value || Boolean(await AttributeName.query().findById(value))
    )
})

export const attributeValueDeletePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeValueDelete-entryDoesNotExist',
      "Can't delete attribute, it does not exist",
      async value => Boolean(await AttributeName.query().findById(value))
    )
})


export type attributeValueFindPayloadType = yup.InferType<typeof attributeValueFindPayloadSchema>
export type attributeValueFindOnePayloadType = yup.InferType<typeof attributeValueFindOnePayloadSchema>
export type attributeValueCreatePayloadType = yup.InferType<typeof attributeValueCreatePayloadSchema>
export type attributeValueUpdatePayloadType = yup.InferType<typeof attributeValueUpdatePayloadSchema>
export type attributeValueDeletePayloadType = yup.InferType<typeof attributeValueDeletePayloadSchema>