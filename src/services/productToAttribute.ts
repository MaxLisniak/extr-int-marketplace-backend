import { productToAttributePayloadType } from "../validationSchemas/productToAttribute"
import Product from "../models/Product"
import ProductToAttribute from "../models/ProductToAttribute"

export async function addAttributeToProduct(payload: productToAttributePayloadType) {

  const { attribute_value_id, product_id } = payload

  const pair = await ProductToAttribute
    .query()
    .findOne({ attribute_value_id, product_id })

  if (pair) throw new Error("Can't add attribute, it's already included")

  return Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .relate(attribute_value_id)
}

export async function removeAttributeFromProduct(payload: productToAttributePayloadType) {

  const { attribute_value_id, product_id } = payload

  const pair = await ProductToAttribute
    .query()
    .findOne({ attribute_value_id, product_id })

  if (!pair) throw new Error("Can't remove attribute, it's not included")

  return Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .unrelate()
    .where('attribute_values.id', attribute_value_id)
}

export function findProductToAttributes() {
  return ProductToAttribute.query()
}

export function findProductToAttributeById(id: number) {
  return ProductToAttribute
    .query()
    .findById(id)
}