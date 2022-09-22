import Product from "../models/Product"
import { characteristicNameType } from "../validationSchemas/characteristicName"
import CharacteristicName from "../models/CharacteristicName"
import CharacteristicValue from "../models/CharacteristicValue"

export function getCharacteristicNames(
  category_id?: number,
  include_characteristic_values?: Boolean
) {
  let query = CharacteristicName.query()
  if (category_id) {
    query.where('category_id', category_id)
  }
  if (include_characteristic_values) {
    query.withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  }
  return query
}

export function getSingleCharacteristicName(
  id: number,
  include_characteristic_values?: Boolean
) {
  const query = CharacteristicName
    .query()
    .findById(id)
  if (include_characteristic_values) {
    query.withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  }
  return query
}

export async function postCharacteristicName(payload: characteristicNameType) {
  const query = CharacteristicName
    .query()
    .insertAndFetch(payload)

  const characteristicName = await query;

  const category_id = characteristicName.category_id;
  const products = await Product
    .query()
    .where("category_id", category_id)

  const characteristicValues = products
    .map((product) => {
      return {
        characteristic_name_id: characteristicName.id,
        product_id: product.id,
        value: ""
      }
    })
  await CharacteristicValue
    .query()
    .insertGraph(characteristicValues)
  return characteristicName
}

export function patchCharacteristicName(id: number, payload: characteristicNameType) {
  const query = CharacteristicName
    .query()
    .patchAndFetchById(id, payload)
  return query
}

export function deleteCharacteristicName(id: number) {
  const query = CharacteristicName
    .query()
    .deleteById(id)
  return query
}