import * as yup from 'yup';
import Product from '../models/Product';
import Brand from '../models/Brand';

const productCreatePayload = yup.object().shape({
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

const productUpdatePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'productUpdate-entryDoesNotExist',
      "Can't update product, it does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  name: yup
    .string()
    .min(1)
    .max(64),
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
    .test(
      'productUpdate-brandDoesNotExist',
      "Can't update product, specified brand does not exist",
      async value => !value || Boolean(await Brand.query().findById(value))
    ),
  price: yup
    .number()
    .integer()
    .positive(),
});

const productFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
});

const filterPayload = yup.object().shape({
  attribute_filters: yup.array().of(
    yup.array().of(
      yup.number().integer().positive()
    )
  ),
  category_id: yup
    .number()
    .integer()
    .positive(),
  brands: yup.array().of(
    yup
      .number()
      .integer()
      .positive(),
  ),
  price: yup.object().shape({
    min: yup.number().integer().positive(),
    max: yup.number().integer().positive()
  }),
  offset: yup
    .number()
    .integer()
    .positive(),
  limit: yup
    .number()
    .integer()
    .positive()
})

const productDeletePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'productDelete-entryDoesNotExist',
      "Can't delete product, it does not exist",
      async value => Boolean(await Product.query().findById(value))
    )
})

export const ProductsValidationSchemas = {
  productCreatePayload,
  productUpdatePayload,
  productFindOnePayload,
  filterPayload,
  productDeletePayload,
}
