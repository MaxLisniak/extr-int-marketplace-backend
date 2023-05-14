import Keyword from '../models/keywords.model';
import * as yup from 'yup';
import { id, limit, offset } from './common.validation';
import KeywordToProduct from '../models/keyword-to-product.model';
import Product from '../models/products.model';

const search_query = yup
  .string()

const keyword = yup
  .string()
  .min(1)
  .max(64)

const findPayload = yup.object().shape({
  search_query: search_query,
  limit: limit,
  offset: offset,
})

const findByIdPayload = yup.object().shape({
  id: id
    .required(),
})

const createPayload = yup.object().shape({
  keyword: keyword
    .required(),
})

const updateByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'keywordUpdate-entryDoesNotExist',
      "Can't update keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    ),
  keyword: keyword
})

const deleteByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'keywordDelete-entryDoesNotExist',
      "Can't delete keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    )
})

const addToProductPayload = yup.object().shape({
  product_id: id
    .required()
    .test(
      'keywordToProductAdd-productDoesNotExist',
      "Can't add keyword, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  keyword_id: id
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

const removeFromProductPayload = yup.object().shape({
  product_id: id
    .required()
    .test(
      'keywordFromProductRemove-productDoesNotExist',
      "Can't remove keyword, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  keyword_id: id
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


export const KeywordsValidationSchemas = {
  findPayload,
  findByIdPayload,
  createPayload,
  updateByIdPayload,
  deleteByIdPayload,
  addToProductPayload,
  removeFromProductPayload,
}

