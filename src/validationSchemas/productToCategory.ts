import * as yup from 'yup';


export const productToCategoryPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  category_id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const productToCategoryFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
});

export type productToCategoryFindOnePayloadType = yup.InferType<typeof productToCategoryFindOnePayloadSchema>
export type productToCategoryPayloadType = yup.InferType<typeof productToCategoryPayloadSchema>
