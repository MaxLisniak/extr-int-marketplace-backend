import {
  addCategoryToProductPayloadType,
  removeCategoryFromProductPayloadType
} from "../validationSchemas/categoryToProduct"
import Product from "../models/Product"
import CategoryToProduct from "../models/CategoryToProduct"


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


export function findCategoryToProductById(id: number) {
  return CategoryToProduct
    .query()
    .findById(id)
}