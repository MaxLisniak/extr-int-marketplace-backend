import {
  addKeywordToProductPayloadType,
  removeKeywordFromProductPayloadType
} from "../validationSchemas/productToKeyword"
import Product from "../models/Product"
import ProductToKeyword from "../models/ProductToKeyword"

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

export function findProductToKeywordById(id: number) {
  return ProductToKeyword
    .query()
    .findById(id)
}