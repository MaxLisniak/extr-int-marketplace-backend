import {
  AddKeywordToProductPayload,
  RemoveKeywordFromProductPayload
} from "../lib/types/keyword-to-product.types"
import Product from "../models/products.model"
import KeywordToProduct from "../models/keyword-to-product.model"

async function addKeywordToProduct(payload: AddKeywordToProductPayload) {

  const { keyword_id, product_id } = payload

  return await Product
    .relatedQuery('keywords')
    .for(product_id)
    .relate(keyword_id)
}

async function removeKeywordFromProduct(payload: RemoveKeywordFromProductPayload) {

  const { keyword_id, product_id } = payload

  return await Product
    .relatedQuery('keywords')
    .for(product_id)
    .unrelate()
    .where('keywords.id', keyword_id)
}

async function findKeywordToProductById(id: number) {
  return await KeywordToProduct
    .query()
    .findById(id)
}

export const KeywordToProductService = {
  addKeywordToProduct,
  removeKeywordFromProduct,
  findKeywordToProductById,
}