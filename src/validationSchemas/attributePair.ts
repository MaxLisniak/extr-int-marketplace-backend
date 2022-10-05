import * as yup from 'yup';

export const attributePairCreatePayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  attribute_value_id: yup
    .number()
    .integer()
    .positive()
    .required(),
});

export const attributePairUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  attribute_name_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  attribute_value_id: yup
    .number()
    .integer()
    .positive()
    .required(),
});

export const attributePairFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})


export type attributePairCreatePayloadType = yup.InferType<typeof attributePairCreatePayloadSchema>
export type attributePairUpdatePayloadType = yup.InferType<typeof attributePairUpdatePayloadSchema>
export type attributePairFindOnePayloadType = yup.InferType<typeof attributePairFindOnePayloadSchema>