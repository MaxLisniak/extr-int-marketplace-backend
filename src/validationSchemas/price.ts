import * as yup from 'yup';

export const priceSchema = yup.object().shape({

  price: yup
    .number()
    .integer()
    .positive()
    .required(),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  date: yup
    .date()
    .required()
});
