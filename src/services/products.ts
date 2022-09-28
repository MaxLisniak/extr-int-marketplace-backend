import CharacteristicName from "../models/CharacteristicName"
import {
  productFindPayloadType,
  productFindOnePayloadType,
  productCreatePayloadType,
  productUpdatePayloadType
} from "../validationSchemas/product"
import Product from "../models/Product"
import CharacteristicValue from "../models/CharacteristicValue"

export function findProducts(payload: productFindPayloadType) {
  const query = Product.query()
  if (payload.category_id) {
    query.where('category_id', payload.category_id)
  }
  if (payload.search_query) {
    query.where('name', 'like', `%${payload.search_query}%`)
  }
  if (payload.include_comments) {
    query.withGraphFetched("comments.[user]")
  }
  if (payload.include_characteristics) {
    query.withGraphFetched("characteristic_values.[characteristic_name]")
  }
  query.orderBy('id', "DESC")
  return query
}

export function findProductById(payload: productFindOnePayloadType) {
  const query = Product
    .query()
    .findById(payload.id)
  if (payload.include_comments) {
    query.withGraphFetched("comments.[user]")
  }
  if (payload.include_characteristics) {
    query.withGraphFetched("characteristic_values.[characteristic_name]")
  }
  return query
}

export async function createProduct(payload: productCreatePayloadType) {
  const query = Product
    .query()
    .insertAndFetch(payload)

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

export function updateProduct(payload: productUpdatePayloadType) {
  const { id, ...body } = payload
  const query = Product
    .query()
    .patchAndFetchById(id, body)
  return query
}

export function deleteProduct(id: number) {
  const query = Product
    .query()
    .deleteById(id)
  return query
}