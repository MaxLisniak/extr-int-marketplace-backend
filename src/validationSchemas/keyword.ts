import * as yup from 'yup';

export const keywordSchema = yup.object().shape({
  keyword: yup
    .string()
    .required()
    .min(1)
    .max(64),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
})
