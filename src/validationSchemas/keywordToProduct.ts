import * as yup from 'yup';
import KeywordToProduct from '../models/KeywordToProduct';
import Product from '../models/Product';
import Keyword from '../models/Keyword';


export const addKeywordToProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'keywordToProductAdd-productDoesNotExist',
      "Can't add keyword, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  keyword_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'keywordToProductAdd-keywordDoesNotExist',
      "Can't add keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    )
    .test(
      'keywordToProductAdd-alreadyAdded',
      "Can't add keyword, it is already added",
      async function () {
        const { keyword_id, product_id } = this.parent;
        return !await KeywordToProduct.query().findOne({ keyword_id, product_id })
      }
    )
})

export const removeKeywordFromProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'keywordFromProductRemove-productDoesNotExist',
      "Can't remove keyword, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  keyword_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'keywordFromProductRemove-keywordDoesNotExist',
      "Can't remove keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    )
    .test(
      'keywordFromProductRemove-notAdded',
      "Can't remove keyword, it is not added",
      async function () {
        const { keyword_id, product_id } = this.parent;
        return Boolean(await KeywordToProduct.query().findOne({ keyword_id, product_id }))
      }
    )
})

export const keywordToProductFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
});

export type addKeywordToProductPayloadType = yup.InferType<typeof addKeywordToProductPayloadSchema>
export type removeKeywordFromProductPayloadType = yup.InferType<typeof removeKeywordFromProductPayloadSchema>
export type keywordToProductFindOnePayloadType = yup.InferType<typeof keywordToProductFindOnePayloadSchema>
