import {
  categoryCreatePayloadType,
  categoryUpdatePayloadType,
} from "../validationSchemas/category"
import Category from "../models/Categoty"

export function findCategories() {
  return Category
    .query() // TODO: ты вытягиваешь всю таблицу
    .orderBy('id', 'DESC')
}
export function findCategoriesNested() {
  return Category
    .query()
}

export function findCategoryById(id: number) {
  return Category
    .query()
    .findById(id)
}

export function createCategory(object: categoryCreatePayloadType) {
  return Category
    .query()
    .insertAndFetch(object)
}

export function updateCategory(id: number, object: categoryUpdatePayloadType) {
  return Category
    .query()
    .patchAndFetchById(id, object)
}

export function deleteCategory(id: number) {
  return Category
    .query()
    .deleteById(id)
}
