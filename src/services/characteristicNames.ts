import Product from "../models/Product"
import {
  characteristicNameCreatePayloadType,
  characteristicNameFindPayloadType,
  characteristicNameFindOnePayloadType,
  characteristicNameUpdatePayloadType,
} from "../validationSchemas/characteristicName"
import CharacteristicName from "../models/CharacteristicName"
import CharacteristicValue from "../models/CharacteristicValue"

export function findCharacteristicNames(payload: characteristicNameFindPayloadType) {
  let query = CharacteristicName.query()
  if (payload.category_id) {
    query.where('category_id', payload.category_id)
  }
  if (payload.include_characteristic_values) {
    query.withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  }
  return query
}

export function findCharacteristicNameById(payload: characteristicNameFindOnePayloadType) {
  const query = CharacteristicName
    .query()
    .findById(payload.id)
  if (payload.include_characteristic_values) {
    query.withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  }
  return query
}

export async function createCharacteristicName(payload: characteristicNameCreatePayloadType) {
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

export function updateCharacteristicName(payload: characteristicNameUpdatePayloadType) {
  const { id, ...body } = payload
  const query = CharacteristicName
    .query()
    .patchAndFetchById(id, body)
  return query
}

export function deleteCharacteristicName(id: number) {
  const query = CharacteristicName
    .query()
    .deleteById(id)
  return query
}