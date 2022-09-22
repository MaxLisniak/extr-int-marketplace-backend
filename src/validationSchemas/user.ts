import * as yup from 'yup';

export const userSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
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
  password: yup
    .string(),
  password_hash: yup
    .string(),
  confPassword: yup
    .string(),
  is_admin: yup
    .bool(),
  refresh_token: yup
    .string(),
})

export type userType = yup.InferType<typeof userSchema>