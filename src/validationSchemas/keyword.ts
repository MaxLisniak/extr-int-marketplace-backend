import Keyword from '../models/Keyword';
import * as yup from 'yup';


export const keywordFindPayloadSchema = yup.object().shape({
  search_query: yup
    .string(),
})

export const keywordFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const keywordCreatePayloadSchema = yup.object().shape({
  keyword: yup
    .string()
    .min(1)
    .max(64)
    .required(),
})

export const keywordUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'keywordUpdate-entryDoesNotExist',
      "Can't update keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    ),
  keyword: yup
    .string()
    .min(1)
    .max(64),
})

export const keywordDeletePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'keywordDelete-entryDoesNotExist',
      "Can't delete keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    )
})

export type keywordFindPayloadType = yup.InferType<typeof keywordFindPayloadSchema>
export type keywordFindOnePayloadType = yup.InferType<typeof keywordFindOnePayloadSchema>
export type keywordUpdatePayloadType = yup.InferType<typeof keywordUpdatePayloadSchema>
export type keywordCreatePayloadType = yup.InferType<typeof keywordCreatePayloadSchema>
export type keywordDeletePayloadType = yup.InferType<typeof keywordCreatePayloadSchema>