import * as yup from 'yup';

export const characteristicNameCreatePayloadSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(32)
    .required(),
  category_id: yup
    .number()
    .integer()
    .positive()
    .required()
});

export const characteristicNameUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  name: yup
    .string()
    .min(1)
    .max(32),
  category_id: yup
    .number()
    .integer()
    .positive()
});

export const characteristicNameFindPayloadSchema = yup.object().shape({
  category_id: yup
    .number()
    .integer()
    .positive(),
})
export const characteristicNameFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})


export type characteristicNameCreatePayloadType = yup.InferType<typeof characteristicNameCreatePayloadSchema>
export type characteristicNameUpdatePayloadType = yup.InferType<typeof characteristicNameUpdatePayloadSchema>
export type characteristicNameFindPayloadType = yup.InferType<typeof characteristicNameFindPayloadSchema>
export type characteristicNameFindOnePayloadType = yup.InferType<typeof characteristicNameFindOnePayloadSchema>