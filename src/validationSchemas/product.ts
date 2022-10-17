import * as yup from 'yup';

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
    .required(),
  price: yup
    .number()
    .integer()
    .positive(),
});

export const productUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
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
    .positive(),
  price: yup
    .number()
    .integer()
    .positive(),
});

export const productFindPayloadSchema = yup.object().shape({
  category_id: yup
    .number()
    .integer()
    .positive(),
  search_query: yup
    .string(),
  page: yup
    .number()
    .integer()
    .positive()
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
  page: yup
    .number()
    .integer()
    .positive()

})


export type productFindPayloadType = yup.InferType<typeof productFindPayloadSchema>
export type productFindOnePayloadType = yup.InferType<typeof productFindOnePayloadSchema>
export type productUpdatePayloadType = yup.InferType<typeof productUpdatePayloadSchema>
export type productCreatePayloadType = yup.InferType<typeof productCreatePayloadSchema>
export type filterPayloadType = yup.InferType<typeof filterPayloadSchema>