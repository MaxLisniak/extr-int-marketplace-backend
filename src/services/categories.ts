import {
  categoryCreatePayloadType,
  categoryFindOnePayloadType,
  categoryUpdatePayloadType,
} from "../validationSchemas/category"
import Category from "../models/Categoty"

export function findCategories() {
  const query = Category
    .query()
    .orderBy('id', 'DESC')
  return query
}
export function findCategoriesNested() {
  const query = Category
    .query()
    .whereNull("parent_id")
    .withGraphFetched('subcategories.^')
    .orderBy('id', 'DESC')
  return query
}

export function findCategoryById(id: number) {
  const query = Category
    .query()
    .findById(id)
  return query
}

export function createCategory(object: categoryCreatePayloadType) {
  const query = Category
    .query()
    .insertAndFetch(object)
  return query
}

export function updateCategory(id: number, object: categoryUpdatePayloadType) {
  const query = Category
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteCategory(id: number) {
  const query = Category
    .query()
    .deleteById(id)
  return query
}
