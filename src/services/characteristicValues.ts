import {
  characteristicValueCreatePayloadType,
  characteristicValueFindOnePayloadType,
  characteristicValueUpdatePayloadType
} from "../validationSchemas/characteristicValue";
import CharacteristicValue from "../models/CharacteristicValue";

export function findCharacteristicValues() {
  const query = CharacteristicValue
    .query()
    .withGraphFetched('characteristic_name')
    .orderBy("characteristic_name_id", "ASC")
  return query
}

export function findCharacteristicValueById(payload: characteristicValueFindOnePayloadType) {
  const query = CharacteristicValue
    .query()
    .findById(payload.id)
    .withGraphFetched('characteristic_name')
  return query
}

export function createCharacteristicValue(object: characteristicValueCreatePayloadType) {
  const query = CharacteristicValue
    .query()
    .insertAndFetch(object)
  return query
}

export function updateCharacteristicValue(id: number, object: characteristicValueUpdatePayloadType) {
  const query = CharacteristicValue
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteCharacteristicValue(id: number) {
  const query = CharacteristicValue
    .query()
    .deleteById(id)
  return query
}