import Category from '../models/Categoty';
import * as yup from 'yup';


export const categoryFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const categoryCreatePayloadSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(32)
    .required(),
  parent_id: yup
    .number()
    .integer()
    .positive()
    .test(
      'categoryCreate-parentCategoryDoesNotExist',
      "Can't create category, parent category does not exist",
      async value => !value || Boolean(await Category.query().findById(value))
    ),
});

export const categoryUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'categoryUpdate-entryDoesNotExist',
      "Can't update category, it does not exist",
      async value => Boolean(await Category.query().findById(value))
    ),
  name: yup
    .string()
    .min(1)
    .max(32),
  parent_id: yup
    .number()
    .integer()
    .positive()
    .test(
      'categoryUpdate-parentCategoryDoesNotExist',
      "Can't update category, parent category does not exist",
      async value => !value || Boolean(await Category.query().findById(value))
    ),
});

export const categoryDeletePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'categoryDelete-entryDoesNotExist',
      "Can't delete category, it does not exist",
      async value => Boolean(await Category.query().findById(value))
    )
})


export type categoryFindOnePayloadType = yup.InferType<typeof categoryFindOnePayloadSchema>
export type categoryCreatePayloadType = yup.InferType<typeof categoryCreatePayloadSchema>
export type categoryUpdatePayloadType = yup.InferType<typeof categoryUpdatePayloadSchema>
export type categoryDeletePayloadType = yup.InferType<typeof categoryDeletePayloadSchema>