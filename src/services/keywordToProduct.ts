import {
  addKeywordToProductPayloadType,
  removeKeywordFromProductPayloadType
} from "../validationSchemas/keywordToProduct"
import Product from "../models/Product"
import KeywordToProduct from "../models/KeywordToProduct"

export async function addKeywordToProduct(payload: addKeywordToProductPayloadType) {

  const { keyword_id, product_id } = payload

  return Product
    .relatedQuery('keywords')
    .for(product_id)
    .relate(keyword_id)
}

export async function removeKeywordFromProduct(payload: removeKeywordFromProductPayloadType) {

  const { keyword_id, product_id } = payload

  return Product
    .relatedQuery('keywords')
    .for(product_id)
    .unrelate()
    .where('keywords.id', keyword_id)
}

export function findKeywordToProductById(id: number) {
  return KeywordToProduct
    .query()
    .findById(id)
}