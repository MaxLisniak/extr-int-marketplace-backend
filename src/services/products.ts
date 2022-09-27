import CharacteristicName from "../models/CharacteristicName"
import { productType } from "../validationSchemas/product"
import Product from "../models/Product"
import CharacteristicValue from "../models/CharacteristicValue"

export function findProducts(
  category_id?: number,
  search_query?: string,
  include_comments?: Boolean,
  include_characteristics?: Boolean
) {
  const query = Product.query()
  if (category_id) {
    query.where('category_id', category_id)
  }
  if (search_query) {
    query.where('name', 'like', `%${search_query}%`)
  }
  if (include_comments) {
    query.withGraphFetched("comments.[user]")
  }
  if (include_characteristics) {
    query.withGraphFetched("characteristic_values.[characteristic_name]")
  }
  query.orderBy('id', "DESC")
  return query
}

export function findProductById(
  id: number,
  include_comments?: Boolean,
  include_characteristics?: Boolean
) {
  const query = Product
    .query()
    .findById(id)
  if (include_comments) {
    query.withGraphFetched("comments.[user]")
  }
  if (include_characteristics) {
    query.withGraphFetched("characteristic_values.[characteristic_name]")
  }
  return query
}

export async function createProduct(payload: productType) {
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

export function updateProduct(
  id: number,
  payload: productType
) {
  const query = Product
    .query()
    .patchAndFetchById(id, payload)
  return query
}

export function deleteProduct(id: number) {
  const query = Product
    .query()
    .deleteById(id)
  return query
}