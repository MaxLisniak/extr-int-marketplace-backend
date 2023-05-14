
import Category from "../models/categories.model"
import { CategoryUpdateByIdPayload, CategoryCreatePayload, CategoryAddProductPayload, CategoryRemoveProductPayload, CategoryFindPayload } from "../lib/types/categories.types"
import Product from "../models/products.model"


async function findRootCategories(params: CategoryFindPayload) {
  const {
    limit,
    offset
  } = params

  const query = Category
    .query()
    .whereNull('parent_id')
    .limit(limit)

  if (offset) {
    query.offset(offset)
  }

  return await query
}

async function findCategoryById(id: number) {
  return await Category
    .query()
    .findById(id)
    .withGraphFetched('subcategories')
}

async function getChildrenCategories(categoryId: number): Promise<Category[]> {
  const category = await Category.query().findById(categoryId);
  if (!category) {
    return [];
  }

  const children: Category[] = await Category.query()
    .where('parent_id', category.id);
  const childIds = children.map(child => child.id);

  const childrenIds = await Promise.all(
    childIds.map(childId => getChildrenCategories(childId))
  );

  return children.concat(...childrenIds);
}

async function createCategory(object: CategoryCreatePayload) {
  return await Category
    .query()
    .insertAndFetch(object)
}

async function updateCategory(id: number, object: CategoryUpdateByIdPayload) {
  return await Category
    .query()
    .patchAndFetchById(id, object)
}

async function deleteCategory(id: number) {
  return await Category
    .query()
    .deleteById(id)
}

async function addProduct(payload: CategoryAddProductPayload) {

  const { category_id, product_id } = payload

  return await Product
    .relatedQuery('categories')
    .for(product_id)
    .relate(category_id)
}

async function removeProduct(payload: CategoryRemoveProductPayload) {

  const { category_id, product_id } = payload

  return await Product
    .relatedQuery('categories')
    .for(product_id)
    .unrelate()
    .where('categories.id', category_id)
}

export const CategoriesService = {
  findRootCategories,
  findCategoryById,
  getChildrenCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  addProduct,
  removeProduct,
}