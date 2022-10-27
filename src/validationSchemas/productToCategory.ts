import ProductToCategory from '../models/ProductToCategory';
import * as yup from 'yup';


export const addCategoryToProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  category_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test('productToCategoryAdd', "Can't add category",
      async function () {
        const res = await ProductToCategory
          .query()
          .findOne({ category_id: this.parent.category_id, product_id: this.parent.product_id })
        return res === undefined
      })
})

export const removeCategoryFromProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  category_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test('productToCategoryRemove', "Can't remove category",
      async function () {
        const res = await ProductToCategory
          .query()
          .findOne({ category_id: this.parent.category_id, product_id: this.parent.product_id })
        return res !== undefined
      })
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
