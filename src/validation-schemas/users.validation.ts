import * as yup from 'yup';
import User from '../models/User';


const userFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

const userCreatePayload = yup.object().shape({
  email: yup
    .string()
    .email()
    .max(64)
    .required(),
  first_name: yup
    .string()
    .min(1)
    .max(64)
    .required(),
  last_name: yup
    .string()
    .min(1)
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

const userUpdatePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'userUpdate-entryDoesNotExist',
      "Can't update user, it does not exist",
      async value => Boolean(await User.query().findById(value))
    ),
  email: yup
    .string()
    .email()
    .max(64),
  first_name: yup
    .string()
    .min(1)
    .max(64),
  last_name: yup
    .string()
    .min(1)
    .max(64),
  password_hash: yup
    .string(),
  is_admin: yup
    .boolean(),
  refresh_token: yup
    .string(),
})

const userSignInPayload = yup.object().shape({
  email: yup
    .string()
    .email()
    .max(64),
  password: yup
    .string()
    .required(),
  password_hash: yup
    .string(),
})

const userDeletePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'userDelete-entryDoesNotExist',
      "Can't delete user, it does not exist",
      async value => Boolean(await User.query().findById(value))
    )
})

export const UsersValidationSchemas = {
  userFindOnePayload,
  userCreatePayload,
  userUpdatePayload,
  userSignInPayload,
  userDeletePayload,
}
