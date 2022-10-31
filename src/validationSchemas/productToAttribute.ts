import * as yup from 'yup';
import ProductToAttribute from '../models/ProductToAttribute';
import Product from '../models/Product';
import AttributeValue from '../models/AttributeValue';


export const addAttributeToProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeToProductAdd-productDoesNotExist',
      "Can't add attribute, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  attribute_value_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeToProductAdd-attributeDoesNotExist',
      "Can't add attribute, it does not exist",
      async value => Boolean(await AttributeValue.query().findById(value))
    )
    .test('attributeToProductAdd-alreadyAdded',
      "Can't add attribute, it's already added",
      async function () {
        const { attribute_value_id, product_id } = this.parent;
        return !await ProductToAttribute.query().findOne({ attribute_value_id, product_id })
      }
    )
})

export const removeAttributeFromProductPayloadSchema = yup.object().shape({
  product_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeFromProductRemove-productDoesNotExist',
      "Can't remove attribute, specified product does not exist",
      async value => Boolean(await Product.query().findById(value))
    ),
  attribute_value_id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'attributeFromProductRemove-attributeDoesNotExist',
      "Can't remove attribute, it does not exist",
      async value => Boolean(await AttributeValue.query().findById(value))
    )
    .test(
      'attributeFromProductRemove-notAdded',
      "Can't remove attribute, it is not added",
      async function () {
        const { attribute_value_id, product_id } = this.parent;
        return Boolean(await ProductToAttribute.query().findOne({ attribute_value_id, product_id }))
      }
    )
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