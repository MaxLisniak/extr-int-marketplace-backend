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
  category_id: yup
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
  category_id: yup
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
  include_comments: yup
    .boolean(),
  include_characteristics: yup
    .boolean(),
});

export const productFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  include_comments: yup
    .boolean(),
  include_characteristics: yup
    .boolean(),
});

export type productFindPayloadType = yup.InferType<typeof productFindPayloadSchema>
export type productFindOnePayloadType = yup.InferType<typeof productFindOnePayloadSchema>
export type productUpdatePayloadType = yup.InferType<typeof productUpdatePayloadSchema>
export type productCreatePayloadType = yup.InferType<typeof productCreatePayloadSchema>
