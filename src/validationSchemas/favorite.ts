import * as yup from 'yup';

export const favoriteSchema = yup.object().shape({
  user_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
});
