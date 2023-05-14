import Brand from '../models/brands.model';
import * as yup from 'yup';

const findPayload = yup.object().shape({
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive()
})

const findByIdPayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

const createPayload = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(64)
    .required(),
})

const updateByIdPayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'brandUpdate-entryDoesNotExist',
      "Can't update brand, it does not exist",
      async value => Boolean(await Brand.query().findById(value))
    ),
  name: yup
    .string()
    .min(1)
    .max(64),
})

const deleteByIdPaylaod = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'brandDelete-entryDoesNotExist',
      "Can't delete brand, it does not exist",
      async value => Boolean(await Brand.query().findById(value))
    )
})

export const BrandsValidationSchemas = {
  findPayload,
  findByIdPayload,
  createPayload,
  updateByIdPayload,
  deleteByIdPaylaod,
}

