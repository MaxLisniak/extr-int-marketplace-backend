import * as yup from 'yup';

export const categoryCreatePayloadSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(32)
    .required(),
  parent_id: yup
    .number()
    .integer()
    .positive()
});

export const categoryUpdatePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
  name: yup
    .string()
    .min(1)
    .max(32),
  parent_id: yup
    .number()
    .integer()
    .positive()
});

export const categoryFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export interface categorySchema {
  id: number,
  parent_id: number,
  name: string,
  subcategories: categorySchema[]
}

export type categoryFindOnePayloadType = yup.InferType<typeof categoryFindOnePayloadSchema>
export type categoryCreatePayloadType = yup.InferType<typeof categoryCreatePayloadSchema>
export type categoryUpdatePayloadType = yup.InferType<typeof categoryUpdatePayloadSchema>