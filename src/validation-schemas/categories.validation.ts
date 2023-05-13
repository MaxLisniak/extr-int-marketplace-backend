import Category from '../models/categories.model';
import * as yup from 'yup';


const categoryFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

const categoryCreatePayload = yup.object().shape({
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

const categoryUpdatePayload = yup.object().shape({
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

const categoryDeletePayload = yup.object().shape({
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

export const CategoriesValidationSchemas = {
  categoryFindOnePayload,
  categoryCreatePayload,
  categoryUpdatePayload,
  categoryDeletePayload,
}
