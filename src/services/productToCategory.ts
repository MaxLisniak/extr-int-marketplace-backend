import {
  addCategoryToProductPayloadType,
  removeCategoryFromProductPayloadType
} from "../validationSchemas/productToCategory"
import Product from "../models/Product"
import ProductToCategory from "../models/ProductToCategory"


export async function addCategoryToProduct(payload: addCategoryToProductPayloadType) {

  const { category_id, product_id } = payload

  return Product
    .relatedQuery('categories')
    .for(product_id)
    .relate(category_id)
}

export async function removeCategoryFromProduct(payload: removeCategoryFromProductPayloadType) {

  const { category_id, product_id } = payload

  return Product
    .relatedQuery('categories')
    .for(product_id)
    .unrelate()
    .where('categories.id', category_id)
}

export function findProductToCategories() {
  return ProductToCategory.query() // TODO: ты хочешь вытянуть всю таблицу?
}

export function findProductToCategoryById(id: number) {
  return ProductToCategory
    .query()
    .findById(id)
}