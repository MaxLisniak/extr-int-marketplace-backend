import * as yup from 'yup';

export const userSchema = yup.object().shape({
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
    .string()
})
