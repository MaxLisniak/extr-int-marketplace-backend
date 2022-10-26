import * as yup from 'yup';

export const commentFindPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  limit: yup
    .number()
    .integer()
    .positive(),
  offset: yup
    .number()
    .integer()
    .positive(),
});

export const commentFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
});

export const commentCreatePayloadSchema = yup.object().shape({
  text: yup
    .string()
    .min(1)
    .max(512)
    .required(),
  user_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
});

export const commentUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  text: yup
    .string()
    .min(1)
    .max(512),
  user_id: yup
    .number()
    .integer()
    .positive(),
  product_id: yup
    .number()
    .integer()
    .positive(),
  created: yup
    .string(),
});



export type commentFindPayloadType = yup.InferType<typeof commentFindPayloadSchema>
export type commentFindOnePayloadType = yup.InferType<typeof commentFindOnePayloadSchema>
export type commentCreatePayloadType = yup.InferType<typeof commentCreatePayloadSchema>
export type commentUpdatePayloadType = yup.InferType<typeof commentUpdatePayloadSchema>