import {
  attributeValueCreatePayloadType,
  attributeValueUpdatePayloadType
} from "../validationSchemas/attributeValue";
import AttributeValue from "../models/AttributeValue";

export function findAttributeValues() {
  return AttributeValue.query()
}

export function findAttributeValueById(id: number) {
  return AttributeValue
    .query()
    .findById(id)
}

export function createAttributeValue(object: attributeValueCreatePayloadType) {
  return AttributeValue
    .query()
    .insertAndFetch(object)
}

export function updateAttributeValue(id: number, object: attributeValueUpdatePayloadType) {
  return AttributeValue
    .query()
    .patchAndFetchById(id, object)
}

export function deleteAttributeValue(id: number) {
  return AttributeValue
    .query()
    .deleteById(id)
}