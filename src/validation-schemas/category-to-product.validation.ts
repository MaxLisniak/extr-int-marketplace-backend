import * as yup from 'yup';
import CategoryToProduct from '../models/CategoryToProduct';
import Product from '../models/Product';
import Category from '../models/Categoty';


const addCategoryToProductPayload = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'categoryToProductAdd-productDoesNotExist',
      "Can't add category, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  category_id: yup
    .number()
    .integer()
    .positive()
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

const removeCategoryFromProductPayload = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'categoryFromProductRemove-productDoesNotExist',
      "Can't remove category, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  category_id: yup
    .number()
    .integer()
    .positive()
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

const categoryToProductFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
})

export const CategoryToProductValidationSchemas = {
  addCategoryToProductPayload,
  removeCategoryFromProductPayload,
  categoryToProductFindOnePayload,
}

