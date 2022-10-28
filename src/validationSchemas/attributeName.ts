import AttributeName from '../models/AttributeName';
import * as yup from 'yup';

export const attributeNameFindPayloadSchema = yup.object().shape({
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive()
})

export const attributeNameFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const attributeNameCreatePayloadSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(32)
    .required(),
});

export const attributeNameUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeNameUpdate-entryDoesNotExist',
      "Can't update attribute name, it does not exist",
      async value => Boolean(await AttributeName.query().findById(value))
    ),
  name: yup
    .string()
    .min(1)
    .max(32),
});

export const attributeNameDeletePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeNameDelete-entryDoesNotExist',
      "Can't delete attribute name, it does not exist",
      async value => Boolean(await AttributeName.query().findById(value))
    )
})


export type attributeNameFindPayloadType = yup.InferType<typeof attributeNameFindPayloadSchema>
export type attributeNameFindOnePayloadType = yup.InferType<typeof attributeNameFindOnePayloadSchema>
export type attributeNameCreatePayloadType = yup.InferType<typeof attributeNameCreatePayloadSchema>
export type attributeNameUpdatePayloadType = yup.InferType<typeof attributeNameUpdatePayloadSchema>
export type attributeNameDeletePayloadType = yup.InferType<typeof attributeNameDeletePayloadSchema>