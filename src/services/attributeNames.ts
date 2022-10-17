import {
  attributeNameCreatePayloadType,
  attributeNameUpdatePayloadType,
} from "../validationSchemas/attributeName"
import AttributeName from "../models/AttributeName"

export function findAttributeNames() {
  const query = AttributeName.query()
  return query
}

export function findAttributeNameById(id: number) {
  const query = AttributeName
    .query()
    .findById(id)
  return query
}

export async function createAttributeName(object: attributeNameCreatePayloadType) {
  const query = AttributeName
    .query()
    .insertAndFetch(object)
  return query
}

export function updateAttributeName(id: number, object: attributeNameUpdatePayloadType) {
  const query = AttributeName
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteAttributeName(id: number) {
  const query = AttributeName
    .query()
    .deleteById(id)
  return query
}