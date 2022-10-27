import ProductToKeyword from '../models/ProductToKeyword';
import * as yup from 'yup';


export const addKeywordToProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  keyword_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test('productToKeywordAdd', "Can't add keyword",
      async function () {
        const res = await ProductToKeyword
          .query()
          .findOne({ keyword_id: this.parent.keyword_id, product_id: this.parent.product_id })
        return res === undefined
      })
})

export const removeKeywordFromProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  keyword_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test('productToKeywordRemove', "Can't remove keyword",
      async function () {
        const res = await ProductToKeyword
          .query()
          .findOne({ keyword_id: this.parent.keyword_id, product_id: this.parent.product_id })
        return res !== undefined
      })
})

export const productToKeywordFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
});

export type addKeywordToProductPayloadType = yup.InferType<typeof addKeywordToProductPayloadSchema>
export type removeKeywordFromProductPayloadType = yup.InferType<typeof removeKeywordFromProductPayloadSchema>
export type productToKeywordFindOnePayloadType = yup.InferType<typeof productToKeywordFindOnePayloadSchema>
