import * as yup from 'yup';


export const productToAttributePayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  attribute_value_id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

export const productToAttributeFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
});

export type productToAttributeFindOnePayloadType = yup.InferType<typeof productToAttributeFindOnePayloadSchema>
export type productToAttributePayloadType = yup.InferType<typeof productToAttributePayloadSchema>
