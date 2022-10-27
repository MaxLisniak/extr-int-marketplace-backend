import ProductToAttribute from '../models/ProductToAttribute';
import * as yup from 'yup';


export const addAttributeToProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  attribute_value_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test('productToAttributeAdd', "Can't add attribute",
      async function () {
        const res = await ProductToAttribute
          .query()
          .findOne({ attribute_value_id: this.parent.attribute_value_id, product_id: this.parent.product_id })
        return res === undefined
      })
})

export const removeAttributeFromProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required(),
  attribute_value_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test('productToAttributeRemove', "Can't remove attribute",
      async function () {
        const res = await ProductToAttribute
          .query()
          .findOne({ attribute_value_id: this.parent.attribute_value_id, product_id: this.parent.product_id })
        return res !== undefined
      })
})

export const productToAttributeFindOnePayloadSchema = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive(),
});

export type addAttributeToProductPayloadType = yup.InferType<typeof addAttributeToProductPayloadSchema>
export type removeAttributeFromProductPayloadType = yup.InferType<typeof removeAttributeFromProductPayloadSchema>
export type productToAttributeFindOnePayloadType = yup.InferType<typeof productToAttributeFindOnePayloadSchema>