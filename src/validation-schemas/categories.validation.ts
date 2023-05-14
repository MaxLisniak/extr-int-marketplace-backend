import CategoryToProduct from '../models/category-to-product.model';
import Category from '../models/categories.model';
import * as yup from 'yup';
import Product from '../models/products.model';
import { id, limit, offset } from './common.validation';

const name = yup
  .string()
  .min(1)
  .max(32)

const findPayload = yup.object().shape({
  limit: limit,
  offset: offset,
})

const findByIdPayload = yup.object().shape({
  id: id
    .required(),
})

const createPayload = yup.object().shape({
  name: name
    .required(),
  parent_id: id
    .test(
      'categoryCreate-parentCategoryDoesNotExist',
      "Can't create category, parent category does not exist",
      async value => !value || Boolean(await Category.query().findById(value))
    ),
});

const updateByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'categoryUpdate-entryDoesNotExist',
      "Can't update category, it does not exist",
      async value => Boolean(await Category.query().findById(value))
    ),
  name: name,
  parent_id: id
    .test(
      'categoryUpdate-parentCategoryDoesNotExist',
      "Can't update category, parent category does not exist",
      async value => !value || Boolean(await Category.query().findById(value))
    ),
});

const deleteByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'categoryDelete-entryDoesNotExist',
      "Can't delete category, it does not exist",
      async value => Boolean(await Category.query().findById(value))
    )
})

const addProductPayload = yup.object().shape({
  product_id: id
    .required()
    .test(
      'categoryToProductAdd-productDoesNotExist',
      "Can't add category, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  category_id: id
    .required()
    .test(
      'categoryToProductAdd-categoryDoesNotExist',
      "Can't add category, it does not exist",
      async value => Boolean(await Category.query().findById(value))
    )
    .test(
      'categoryToProductAdd-alreadyAdded',
      "Can't add category, it is already added",
      async function () {
        const { category_id, product_id } = this.parent
        return !await CategoryToProduct.query().findOne({ category_id, product_id })
      }
    )
})

const removeProductPayload = yup.object().shape({
  product_id: id
    .required()
    .test(
      'categoryFromProductRemove-productDoesNotExist',
      "Can't remove category, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  category_id: id
    .required()
    .test(
      'categoryFromProductRemove-categoryDoesNotExist',
      "Can't remove category, it does not exist",
      async value => Boolean(await Category.query().findById(value))
    )
    .test(
      'categoryFromProductRemove-notAdded',
      "Can't remove category, it is not added",
      async function () {
        const { category_id, product_id } = this.parent
        return Boolean(await CategoryToProduct.query().findOne({ category_id, product_id }))
      }
    )
})

export const CategoriesValidationSchemas = {
  findPayload,
  findByIdPayload,
  createPayload,
  updateByIdPayload,
  deleteByIdPayload,
  addProductPayload,
  removeProductPayload
}
