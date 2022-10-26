import * as yup from 'yup';

export const attributeNameFindPayloadSchema = yup.object().shape({
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive()
})

export const attributeNameFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const attributeNameCreatePayloadSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(32)
    .required(),
});

export const attributeNameUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  name: yup
    .string()
    .min(1)
    .max(32),
});


export type attributeNameFindPayloadType = yup.InferType<typeof attributeNameFindPayloadSchema>
export type attributeNameFindOnePayloadType = yup.InferType<typeof attributeNameFindOnePayloadSchema>
export type attributeNameCreatePayloadType = yup.InferType<typeof attributeNameCreatePayloadSchema>
export type attributeNameUpdatePayloadType = yup.InferType<typeof attributeNameUpdatePayloadSchema>