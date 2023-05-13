import Product from "../models/products.model"
import AttributeToProduct from "../models/attribute-to-product.model"
import { AddAttributeToProductPayload, RemoveAttributeFromProductPayload } from "../lib/types/attribute-to-product.types"

async function addAttributeToProduct(payload: AddAttributeToProductPayload) {

  const { attribute_value_id, product_id } = payload

  return await Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .relate(attribute_value_id)
}

async function removeAttributeFromProduct(payload: RemoveAttributeFromProductPayload) {

  const { attribute_value_id, product_id } = payload

  return await Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .unrelate()
    .where('attribute_values.id', attribute_value_id)
}

async function findAttributeToProductById(id: number) {
  return await AttributeToProduct
    .query()
    .findById(id)
}

export const AttributeToProductService = {
  addAttributeToProduct,
  removeAttributeFromProduct,
  findAttributeToProductById,
}