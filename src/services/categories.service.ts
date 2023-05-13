
import Category from "../models/Categoty"
import { CategoryUpdatePayload, CategoryCreatePayload } from "../lib/types/categories.types"


async function findCategoriesNested() {
  return await Category
    .query()
}

async function findCategoryById(id: number) {
  return await Category
    .query()
    .findById(id)
}

async function createCategory(object: CategoryCreatePayload) {
  return await Category
    .query()
    .insertAndFetch(object)
}

async function updateCategory(id: number, object: CategoryUpdatePayload) {
  return await Category
    .query()
    .patchAndFetchById(id, object)
}

async function deleteCategory(id: number) {
  return await Category
    .query()
    .deleteById(id)
}

export const CategoriesService = {
  findCategoriesNested,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
}