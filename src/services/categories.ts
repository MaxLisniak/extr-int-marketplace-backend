import { categoryType } from "../validationSchemas/category"
import Category from "../models/Categoty"

export function getCategories(nested?: Boolean) {
  const query = Category.query()
  if (nested) {
    query
      .whereNull("parent_id")
      .withGraphFetched('subcategories.^')
  }
  query.orderBy('id', 'DESC')
  return query
}

export function getSingleCategory(id: number, nested?: Boolean) {
  const query = Category
    .query()
    .findById(id)
  if (nested) {
    query.withGraphFetched('subcategories.^')
  }
  return query
}

export function postCategory(payload: categoryType) {
  const query = Category
    .query()
    .insertAndFetch(payload)
  return query
}

export function patchCategory(id: number, payload: categoryType) {
  const query = Category
    .query()
    .patchAndFetchById(id, payload)
  return query
}

export function deleteCategory(id: number) {
  const query = Category
    .query()
    .deleteById(id)
  return query
}
