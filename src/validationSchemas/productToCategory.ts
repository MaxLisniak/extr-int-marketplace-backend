import * as yup from 'yup';
import ProductToCategory from '../models/ProductToCategory';
import Product from '../models/Product';
import Category from '../models/Categoty';


export const addCategoryToProductPayloadSchema = yup.object().shape({
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
        return !await ProductToCategory.query().findOne({ category_id, product_id })
      }
    )
})

export const removeCategoryFromProductPayloadSchema = yup.object().shape({
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
        return Boolean(await ProductToCategory.query().findOne({ category_id, product_id }))
      }
    )
})

export const productToCategoryFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
});

export type addCategoryToProductPayloadType = yup.InferType<typeof addCategoryToProductPayloadSchema>
export type removeCategoryFromProductPayloadType = yup.InferType<typeof removeCategoryFromProductPayloadSchema>
export type productToCategoryFindOnePayloadType = yup.InferType<typeof productToCategoryFindOnePayloadSchema>
