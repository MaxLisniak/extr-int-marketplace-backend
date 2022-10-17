import { productToCategoryPayloadType } from "../validationSchemas/productToCategory"
import Product from "../models/Product"
import ProductToCategory from "../models/ProductToCategory"


export async function addCategoryToProduct(payload: productToCategoryPayloadType) {
  const { category_id, product_id } = payload
  const pair = await ProductToCategory
    .query()
    .findOne({ category_id, product_id })
  if (pair) throw new Error("Can't add category, it's already included")
  const query = Product
    .relatedQuery('categories')
    .for(product_id)
    .relate(category_id)
  return query
}

export async function removeCategoryFromProduct(payload: productToCategoryPayloadType) {
  const { category_id, product_id } = payload
  const pair = await ProductToCategory
    .query()
    .findOne({ category_id, product_id })
  if (!pair) throw new Error("Can't remove category, it's not included")
  const query = Product
    .relatedQuery('categories')
    .for(product_id)
    .unrelate()
    .where('categories.id', category_id)
  return query
}

export function findProductToCategories() {
  const query = ProductToCategory.query()
  return query
}

export function findProductToCategoryById(id: number) {
  const query = ProductToCategory
    .query()
    .findById(id)
  return query
}