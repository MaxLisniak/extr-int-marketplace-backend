import * as yup from 'yup';
import Product from '../models/Product';
import Brand from '../models/Brand';

export const productCreatePayloadSchema = yup.object().shape({
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

export const productUpdatePayloadSchema = yup.object().shape({
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


export const productFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
});

export const filterPayloadSchema = yup.object().shape({
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

export const productDeletePayloadSchema = yup.object().shape({
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

export type productFindOnePayloadType = yup.InferType<typeof productFindOnePayloadSchema>
export type filterPayloadType = yup.InferType<typeof filterPayloadSchema>
export type productUpdatePayloadType = yup.InferType<typeof productUpdatePayloadSchema>
export type productCreatePayloadType = yup.InferType<typeof productCreatePayloadSchema>
export type productDeletePayloadType = yup.InferType<typeof productDeletePayloadSchema>
