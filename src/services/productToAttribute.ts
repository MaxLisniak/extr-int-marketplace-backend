import Product from "../models/Product"
import ProductToAttribute from "../models/ProductToAttribute"
import createHttpError from "http-errors"
import { addAttributeToProductPayloadType, removeAttributeFromProductPayloadType } from "../validationSchemas/productToAttribute"

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

export function findProductToAttributes() {
  return ProductToAttribute.query() // TODO: ты хочешь вытянуть всю таблицу?
}

export function findProductToAttributeById(id: number) {
  return ProductToAttribute
    .query()
    .findById(id)
}