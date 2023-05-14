import * as yup from 'yup';
import Product from '../models/products.model';
import Brand from '../models/brands.model';
import { id, limit, offset } from './common.validation';
import Category from '../models/categories.model';

const name = yup
  .string()
  .min(1)
  .max(64)

const description = yup
  .string()
  .min(1)
  .max(512)

const image_url = yup
  .string()
  .min(1)

const price = yup
  .number()
  .integer()
  .positive()

const attributeName = yup
  .string()
  .min(1)
  .max(32)

const attributeValue = yup
  .string()
  .min(1)
  .max(64)

const createPayload = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(64)
    .required(),
  description: yup
    .string()
    .min(1)
    .max(512),
  image_url: yup
    .string()
    .min(1),
  brand_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'productCreate-brandDoesNotExist',
      "Can't create product, specified brand does not exist",
      async value => Boolean(await Brand.query().findById(value))
    ),
  price: yup
    .number()
    .positive(),
});

const updateByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'productUpdate-entryDoesNotExist',
      "Can't update product, it does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  name: name,
  description: description,
  image_url: image_url,
  brand_id: id
    .test(
      'productUpdate-brandDoesNotExist',
      "Can't update product, specified brand does not exist",
      async value => !value || Boolean(await Brand.query().findById(value))
    ),
  price: price,
});

const findByIdPayload = yup.object().shape({
  id: id
    .required(),
});

const getFilterList = yup.object().shape({
  category_id: id
    .required()
    .test(
      'getFilterList-entryDoesNotExist',
      "Specified category does not exist",
      async value => Boolean(await Category.query().findById(value))
    ),
})

const findByFiltersPayload = yup.object().shape({
  attribute_filters: yup.array().of(
    yup.array().of(
      id
    )
  ),
  category_id: id,
  brands: yup.array().of(id),
  price: yup.object().shape({
    min: price,
    max: price
  }),
  offset: offset,
  limit: limit
})

const deleteByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'productDelete-entryDoesNotExist',
      "Can't delete product, it does not exist",
      async value => Boolean(await Product.query().findById(value))
    )
})

const addAttributePayload = yup.object().shape({
  name: attributeName
    .required(),
  value: attributeValue
    .required(),
  product_id: id
    .required()
    .test(
      'addAttribute-entryDoesNotExist',
      "Can't add attribute, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
})

const removeAttributePayload = yup.object().shape({
  attribute_id: id
    .required(),
  product_id: id
    .required()
    .test(
      'removeAttribute-entryDoesNotExist',
      "Can't remove attribute, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
})


export const ProductsValidationSchemas = {
  createPayload,
  updateByIdPayload,
  findByIdPayload,
  findByFiltersPayload,
  deleteByIdPayload,
  addAttributePayload,
  removeAttributePayload,
  getFilterList,
}
