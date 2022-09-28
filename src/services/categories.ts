import {
  categoryCreatePayloadType,
  categoryFindPayloadType,
  categoryFindOnePayloadType,
  categoryUpdatePayloadType,
} from "../validationSchemas/category"
import Category from "../models/Categoty"

export function findCategories(payload: categoryFindPayloadType) {
  const query = Category.query()
  if (payload?.nested) {
    query
      .whereNull("parent_id")
      .withGraphFetched('subcategories.^')
  }
  query.orderBy('id', 'DESC')
  return query
}

export function findCategoryById(payload: categoryFindOnePayloadType) {
  const query = Category
    .query()
    .findById(payload.id)
  if (payload.nested) {
    query.withGraphFetched('subcategories.^')
  }
  return query
}

export function createCategory(payload: categoryCreatePayloadType) {
  const query = Category
    .query()
    .insertAndFetch(payload)
  return query
}

export function updateCategory(payload: categoryUpdatePayloadType) {
  const { id, ...body } = payload
  const query = Category
    .query()
    .patchAndFetchById(id, body)
  return query
}

export function deleteCategory(id: number) {
  const query = Category
    .query()
    .deleteById(id)
  return query
}
