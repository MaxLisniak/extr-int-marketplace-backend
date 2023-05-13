import Brand from '../models/brands.model';
import * as yup from 'yup';

const brandFindPayload = yup.object().shape({
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive()
})

const brandFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

const brandCreatePayload = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(64)
    .required(),
})

const brandUpdatePayload = yup.object().shape({
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

const brandDeletePayload = yup.object().shape({
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
  brandFindPayload,
  brandFindOnePayload,
  brandCreatePayload,
  brandUpdatePayload,
  brandDeletePayload,
}

