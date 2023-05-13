
import { AttributeNameCreatePayload, AttributeNameFindPayload, AttributeNameUpdatePayload } from "../lib/types/attribute-names.types";
import AttributeName from "../models/attribute-names.model"

function findAttributeNames(params: AttributeNameFindPayload) {
  const { limit = 10, offset = 0 } = params;
  return AttributeName
    .query()
    .offset(offset)
    .limit(limit)
    .orderBy('name', 'DESC');
}

function findAttributeNameById(id: number) {
  return AttributeName
    .query()
    .findById(id)
}

async function createAttributeName(object: AttributeNameCreatePayload) {
  return await AttributeName
    .query()
    .insertAndFetch(object)
}

async function updateAttributeName(id: number, object: AttributeNameUpdatePayload) {
  return await AttributeName
    .query()
    .patchAndFetchById(id, object)
}

async function deleteAttributeName(id: number) {
  return await AttributeName
    .query()
    .deleteById(id)
}

export const AttributeNamesService = {
  findAttributeNames,
  findAttributeNameById,
  createAttributeName,
  updateAttributeName,
  deleteAttributeName,
}