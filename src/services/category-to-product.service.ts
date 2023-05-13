
import Product from "../models/Product"
import CategoryToProduct from "../models/CategoryToProduct"
import { AddCategoryToProductPayload, RemoveCategoryFromProductPayload } from "../lib/types/category-to-product.types"


async function addCategoryToProduct(payload: AddCategoryToProductPayload) {

  const { category_id, product_id } = payload

  return await Product
    .relatedQuery('categories')
    .for(product_id)
    .relate(category_id)
}

async function removeCategoryFromProduct(payload: RemoveCategoryFromProductPayload) {

  const { category_id, product_id } = payload

  return await Product
    .relatedQuery('categories')
    .for(product_id)
    .unrelate()
    .where('categories.id', category_id)
}


async function findCategoryToProductById(id: number) {
  return await CategoryToProduct
    .query()
    .findById(id)
}

export const CategoryToProductService = {
  addCategoryToProduct,
  removeCategoryFromProduct,
  findCategoryToProductById,
}