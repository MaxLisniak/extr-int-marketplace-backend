import Product from "../models/Product"
import {
  characteristicNameCreatePayloadType,
  characteristicNameFindPayloadType,
  characteristicNameFindOnePayloadType,
  characteristicNameUpdatePayloadType,
} from "../validationSchemas/characteristicName"
import CharacteristicName from "../models/CharacteristicName"
import CharacteristicValue from "../models/CharacteristicValue"

export function findCharacteristicNames(params: characteristicNameFindPayloadType) {
  let query = CharacteristicName.query()
  if (params.category_id) {
    query.where('category_id', params.category_id)
  }
  query.withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  return query
}

export function findCharacteristicNameById(id: number) {
  const query = CharacteristicName
    .query()
    .findById(id)
  query.withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  return query
}

export async function createCharacteristicName(object: characteristicNameCreatePayloadType) {
  const query = CharacteristicName
    .query()
    .insertAndFetch(object)

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

export function updateCharacteristicName(id: number, object: characteristicNameUpdatePayloadType) {
  const query = CharacteristicName
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteCharacteristicName(id: number) {
  const query = CharacteristicName
    .query()
    .deleteById(id)
  return query
}