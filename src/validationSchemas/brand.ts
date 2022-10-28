import Brand from '../models/Brand';
import * as yup from 'yup';

export const brandFindPayloadSchema = yup.object().shape({
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive()
})

export const brandFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const brandCreatePayloadSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(64)
    .required(),
})

export const brandUpdatePayloadSchema = yup.object().shape({
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

export const brandDeletePayloadSchema = yup.object().shape({
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

export type brandFindPayloadType = yup.InferType<typeof brandFindPayloadSchema>
export type brandFindOnePayloadType = yup.InferType<typeof brandFindOnePayloadSchema>
export type brandCreatePayloadType = yup.InferType<typeof brandCreatePayloadSchema>
export type brandUpdatePayloadType = yup.InferType<typeof brandUpdatePayloadSchema>
export type brandDeletePayloadType = yup.InferType<typeof brandDeletePayloadSchema>