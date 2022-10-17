import * as yup from 'yup';


export const productToKeywordPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  keyword_id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const productToKeywordFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
});


export type productToKeywordFindOnePayloadType = yup.InferType<typeof productToKeywordFindOnePayloadSchema>
export type productToKeywordPayloadType = yup.InferType<typeof productToKeywordPayloadSchema>
