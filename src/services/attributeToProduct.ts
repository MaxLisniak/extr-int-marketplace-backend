import Product from "../models/Product"
import AttributeToProduct from "../models/AttributeToProduct"
import { addAttributeToProductPayloadType, removeAttributeFromProductPayloadType } from "../validationSchemas/attributeToProduct"

export async function addAttributeToProduct(payload: addAttributeToProductPayloadType) {

  const { attribute_value_id, product_id } = payload

  return Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .relate(attribute_value_id)
}

export async function removeAttributeFromProduct(payload: removeAttributeFromProductPayloadType) {

  const { attribute_value_id, product_id } = payload

  return Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .unrelate()
    .where('attribute_values.id', attribute_value_id)
}

export function findAttributeToProductById(id: number) {
  return AttributeToProduct
    .query()
    .findById(id)
}