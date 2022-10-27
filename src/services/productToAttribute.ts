import Product from "../models/Product"
import ProductToAttribute from "../models/ProductToAttribute"
import createHttpError from "http-errors"
import { addAttributeToProductPayloadType, removeAttributeToProductPayloadType } from "../validationSchemas/productToAttribute"

export async function addAttributeToProduct(payload: addAttributeToProductPayloadType) {

  const { attribute_value_id, product_id } = payload

  // const pair = await ProductToAttribute
  //   .query()
  //   .findOne({ attribute_value_id, product_id })

  // // if (pair) throw new Error("Can't add attribute, it's already included")
  // if (pair) { throw createHttpError(400, "Can't add attribute, it's already included") } // TODO: засунь это в валидатор

  return Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .relate(attribute_value_id)
}

export async function removeAttributeFromProduct(payload: removeAttributeToProductPayloadType) {

  const { attribute_value_id, product_id } = payload

  // const pair = await ProductToAttribute
  //   .query()
  //   .findOne({ attribute_value_id, product_id })

  // if (!pair) throw new Error("Can't remove attribute, it's not included") // TODO: засунь это в валидатор

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