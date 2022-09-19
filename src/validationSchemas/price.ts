import * as yup from 'yup';

export const priceSchema = yup.object().shape({
  price: yup
    .number()
    .integer()
    .positive(),
  product_id: yup
    .number()
    .integer()
    .positive(),
  date: yup
    .date(),
});