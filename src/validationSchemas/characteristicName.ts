import * as yup from 'yup';

export const characteristicNameSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(32),
  category_id: yup
    .number()
    .integer()
    .positive()
});
