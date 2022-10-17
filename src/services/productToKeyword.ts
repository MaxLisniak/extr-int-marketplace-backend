import { productToKeywordPayloadType } from "../validationSchemas/productToKeyword"
import Product from "../models/Product"
import ProductToKeyword from "../models/ProductToKeyword"

export async function addKeywordToProduct(payload: productToKeywordPayloadType) {

  const { keyword_id, product_id } = payload

  const pair = await ProductToKeyword
    .query()
    .findOne({ keyword_id, product_id })

  if (pair) throw new Error("Can't add keyword, it's already included")

  return Product
    .relatedQuery('keywords')
    .for(product_id)
    .relate(keyword_id)
}

export async function removeKeywordFromProduct(payload: productToKeywordPayloadType) {

  const { keyword_id, product_id } = payload

  const pair = await ProductToKeyword
    .query()
    .findOne({ keyword_id, product_id })

  if (!pair) throw new Error("Can't remove keyword, it's not included")

  return Product
    .relatedQuery('keywords')
    .for(product_id)
    .unrelate()
    .where('keywords.id', keyword_id)
}

export function findProductToKeywords() {
  return ProductToKeyword.query()
}

export function findProductToKeywordById(id: number) {
  return ProductToKeyword
    .query()
    .findById(id)
}