
import Product from "../models/products.model"
import { KeywordAddToProductPayload, KeywordCreatePayload, KeywordFindPayload, KeywordRemoveFromProductPayload, KeywordUpdateByIdPayload } from "../lib/types/keywords.types"
import Keyword from "../models/keywords.model"

async function find(params: KeywordFindPayload) {
  const {
    search_query,
    limit,
    offset
  } = params

  const query = Keyword.query()

  if (search_query) {
    query.where('keyword', 'like', `%${search_query}%`)
  }

  query
    .withGraphFetched('products')
    .limit(limit)

  if (offset) {
    query.offset(offset)
  }

  return await query
}

async function findById(id: number) {
  const query = Keyword
    .query()
    .findById(id)

  query.withGraphFetched('product')

  return await query
}

async function create(object: KeywordCreatePayload) {
  return await Keyword
    .query()
    .insertAndFetch(object)
}

async function updateById(id: number, object: KeywordUpdateByIdPayload) {
  return await Keyword
    .query()
    .patchAndFetchById(id, object)
}

async function deleteById(id: number) {
  return await Keyword
    .query()
    .deleteById(id)
}

async function addToProduct(payload: KeywordAddToProductPayload) {

  const { keyword_id, product_id } = payload

  return await Product
    .relatedQuery('keywords')
    .for(product_id)
    .relate(keyword_id)
}

async function removeFromProduct(payload: KeywordRemoveFromProductPayload) {

  const { keyword_id, product_id } = payload

  return await Product
    .relatedQuery('keywords')
    .for(product_id)
    .unrelate()
    .where('keywords.id', keyword_id)
}

export const KeywordsService = {
  find,
  findById,
  create,
  updateById,
  deleteById,
  addToProduct,
  removeFromProduct
}