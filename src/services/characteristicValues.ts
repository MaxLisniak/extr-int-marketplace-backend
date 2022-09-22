import { characteristicValueType } from "../validationSchemas/characteristicValue";
import CharacteristicValue from "../models/CharacteristicValue";

export function getCharacteristicValues() {
  const query = CharacteristicValue
    .query()
    .withGraphFetched('characteristic_name')
    .orderBy("characteristic_name_id", "ASC")
  return query
}

export function getCharacteristicValueById(id: number) {
  const query = CharacteristicValue
    .query()
    .findById(id)
    .withGraphFetched('characteristic_name')
  return query
}

export function postCharacteristicValue(payload: characteristicValueType) {
  const query = CharacteristicValue
    .query()
    .insertAndFetch(payload)
  return query
}

export function patchCharacteristicValue(id: number, payload: characteristicValueType) {
  const query = CharacteristicValue
    .query()
    .patchAndFetchById(id, payload)
  return query
}

export function deleteCharacteristicValue(id: number) {
  const query = CharacteristicValue
    .query()
    .deleteById(id)
  return query
}