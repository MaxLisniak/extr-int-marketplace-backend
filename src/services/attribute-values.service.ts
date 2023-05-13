
import { AttributeValueCreatePayload, AttributeValueFindPayload, AttributeValueUpdatePayload } from "../lib/types/attribute-values.types";
import AttributeValue from "../models/AttributeValue";

async function findAttributeValues(params: AttributeValueFindPayload) {
  const { limit = 10, offset = 0, attribute_name_id } = params;
  return await AttributeValue
    .query()
    .where({ attribute_name_id })
    .offset(offset)
    .limit(limit);
}

async function findAttributeValueById(id: number) {
  return await AttributeValue
    .query()
    .findById(id)
}

async function createAttributeValue(object: AttributeValueCreatePayload) {
  return await AttributeValue
    .query()
    .insertAndFetch(object)
}

async function updateAttributeValue(id: number, object: AttributeValueUpdatePayload) {
  return await AttributeValue
    .query()
    .patchAndFetchById(id, object)
}

async function deleteAttributeValue(id: number) {
  return await AttributeValue
    .query()
    .deleteById(id)
}

export const AttributeValuesService = {
  findAttributeValues,
  findAttributeValueById,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
}