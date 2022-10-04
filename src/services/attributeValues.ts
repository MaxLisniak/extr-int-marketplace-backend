import {
  attributeValueCreatePayloadType,
  attributeValueUpdatePayloadType
} from "../validationSchemas/attributeValue";
import AttributeValue from "../models/AttributeValue";

export function findAttributeValues() {
  const query = AttributeValue.query()
  // .withGraphFetched('characteristic_name')
  // .orderBy("characteristic_name_id", "ASC")
  return query
}

export function findAttributeValueById(id: number) {
  const query = AttributeValue
    .query()
    .findById(id)
  // .withGraphFetched('characteristic_name')
  return query
}

export function createAttributeValue(object: attributeValueCreatePayloadType) {
  const query = AttributeValue
    .query()
    .insertAndFetch(object)
  return query
}

export function updateAttributeValue(id: number, object: attributeValueUpdatePayloadType) {
  const query = AttributeValue
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteAttributeValue(id: number) {
  const query = AttributeValue
    .query()
    .deleteById(id)
  return query
}