import * as yup from 'yup';

export const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(1)
    .max(32),
});