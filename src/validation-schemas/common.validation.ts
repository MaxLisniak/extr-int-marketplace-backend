import * as yup from 'yup';

export const limit = yup
  .number()
  .positive()
  .integer()
  .default(100)

export const offset = yup
  .number()
  .positive()
  .integer()
  .default(0)
