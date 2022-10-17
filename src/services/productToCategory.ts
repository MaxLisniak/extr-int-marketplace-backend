import { productToCategoryPayloadType } from "../validationSchemas/productToCategory"
import Product from "../models/Product"
import ProductToCategory from "../models/ProductToCategory"


export async function addCategoryToProduct(payload: productToCategoryPayloadType) {

  const { category_id, product_id } = payload

  const pair = await ProductToCategory
    .query()
    .findOne({ category_id, product_id })

  if (pair) throw new Error("Can't add category, it's already included")

  return Product
    .relatedQuery('categories')
    .for(product_id)
    .relate(category_id)
}

export async function removeCategoryFromProduct(payload: productToCategoryPayloadType) {

  const { category_id, product_id } = payload

  const pair = await ProductToCategory
    .query()
    .findOne({ category_id, product_id })

  if (!pair) throw new Error("Can't remove category, it's not included")

  return Product
    .relatedQuery('categories')
    .for(product_id)
    .unrelate()
    .where('categories.id', category_id)
}

export function findProductToCategories() {
  return ProductToCategory.query()
}

export function findProductToCategoryById(id: number) {
  return ProductToCategory
    .query()
    .findById(id)
}