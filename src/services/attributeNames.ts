import {
  attributeNameCreatePayloadType,
  attributeNameUpdatePayloadType,
} from "../validationSchemas/attributeName"
import AttributeName from "../models/AttributeName"

export function findAttributeNames() {
  return AttributeName.query() // TODO: должна быть паджинация
}

export function findAttributeNameById(id: number) {
  return AttributeName
    .query()
    .findById(id)
}

export async function createAttributeName(object: attributeNameCreatePayloadType) {
  return AttributeName
    .query()
    .insertAndFetch(object)
}

export function updateAttributeName(id: number, object: attributeNameUpdatePayloadType) {
  return AttributeName
    .query()
    .patchAndFetchById(id, object)
}

export function deleteAttributeName(id: number) {
  return AttributeName
    .query()
    .deleteById(id)
}