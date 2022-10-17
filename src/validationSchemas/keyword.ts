import * as yup from 'yup';

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
    .required(),
  keyword: yup
    .string()
    .min(1)
    .max(64),
})

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

export type keywordFindPayloadType = yup.InferType<typeof keywordFindPayloadSchema>
export type keywordFindOnePayloadType = yup.InferType<typeof keywordFindOnePayloadSchema>
export type keywordUpdateType = yup.InferType<typeof keywordUpdatePayloadSchema>
export type keywordCreateType = yup.InferType<typeof keywordCreatePayloadSchema>