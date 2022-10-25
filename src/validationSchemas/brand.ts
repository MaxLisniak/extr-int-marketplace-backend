import * as yup from 'yup';

export const brandCreatePayloadSchema = yup.object().shape({
  name: yup
    .string()
    .min(0) // TODO: зачем тебе пустое значение
    .max(64)
    .required(),
})

export const brandUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  name: yup
    .string()
    .min(0) // TODO: зачем тебе пустое значение
    .max(64),
})

export const brandFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})


export type brandFindOnePayloadType = yup.InferType<typeof brandFindOnePayloadSchema>
export type brandUpdatePayloadType = yup.InferType<typeof brandUpdatePayloadSchema>
export type brandCreatePayloadType = yup.InferType<typeof brandCreatePayloadSchema>