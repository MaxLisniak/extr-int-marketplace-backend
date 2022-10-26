import {
  attributeNameCreatePayloadType,
  attributeNameFindPayloadType,
  attributeNameUpdatePayloadType,
} from "../validationSchemas/attributeName"
import AttributeName from "../models/AttributeName"

export function findAttributeNames(params: attributeNameFindPayloadType) {
  const { limit = 10, offset = 0 } = params;
  return AttributeName
    .query()
    .offset(offset)
    .limit(limit)
    .orderBy('name', 'DESC');
  // TODO: должна быть паджинация 
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