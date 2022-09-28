import * as yup from 'yup';

export const userCreatePayloadSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .min(0)
    .max(64)
    .required(),
  first_name: yup
    .string()
    .min(0)
    .max(64)
    .required(),
  last_name: yup
    .string()
    .min(0)
    .max(64),
  password: yup
    .string()
    .required(),
  confPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match.'),
  password_hash: yup
    .string(),
  is_admin: yup
    .boolean(),
})

export const userUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  email: yup
    .string()
    .email()
    .min(0)
    .max(64),
  first_name: yup
    .string()
    .min(0)
    .max(64),
  last_name: yup
    .string()
    .min(0)
    .max(64),
  password_hash: yup
    .string(),
  is_admin: yup
    .boolean(),
  refresh_token: yup
    .string(),
})

export const userFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  include_favorite_products: yup
    .boolean(),
})

export const userSignInPayloadSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .min(0)
    .max(64),
  password: yup
    .string()
    .required(),
  password_hash: yup
    .string(),
})

export type userCreatePayloadType = yup.InferType<typeof userCreatePayloadSchema>
export type userUpdatePayloadType = yup.InferType<typeof userUpdatePayloadSchema>
export type userFindOnePayloadType = yup.InferType<typeof userFindOnePayloadSchema>
export type userSignInPayloadType = yup.InferType<typeof userSignInPayloadSchema>