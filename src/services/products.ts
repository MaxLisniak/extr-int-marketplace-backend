import CharacteristicName from "../models/CharacteristicName"
import {
  productFindPayloadType,
  productFindOnePayloadType,
  productCreatePayloadType,
  productUpdatePayloadType
} from "../validationSchemas/product"
import Product from "../models/Product"
import CharacteristicValue from "../models/CharacteristicValue"

export function findProducts(params: productFindPayloadType) {
  const query = Product.query()
  // fetch products that belong to a particular category
  if (params.category_id) {
    query.where('category_id', params.category_id)
  }
  // limit products to those which name is like specified
  if (params.search_query) {
    query.where('name', 'like', `%${params.search_query}%`)
  }
  query.orderBy('id', "DESC")
  return query
}

export function findProductById(id: number) {
  const query = Product
    .query()
    .findById(id)
  return query
}

export async function createProduct(object: productCreatePayloadType) {
  const query = Product
    .query()
    .insertAndFetch(object)

  const product = await query

  const categoryId = product.category_id;
  const characteristicNames = await CharacteristicName
    .query()
    .where("category_id", categoryId)
    .orderBy("id", "DESC")

  const characteristicValues = characteristicNames
    .map((characteristicName) => {
      return {
        characteristic_name_id: characteristicName.id,
        product_id: product.id,
        value: ""
      }
    })
  await CharacteristicValue
    .query()
    .insertGraph(characteristicValues)
  return product
}

export function updateProduct(id: number, object: productUpdatePayloadType) {
  const query = Product
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteProduct(id: number) {
  const query = Product
    .query()
    .deleteById(id)
  return query
}