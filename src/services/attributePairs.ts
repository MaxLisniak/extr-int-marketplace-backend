import {
  attributePairCreatePayloadType,
  attributePairUpdatePayloadType
} from "../validationSchemas/attributePair";
import AttributePair from "../models/AttributePair";

export function findAttributePairs() {
  const query = AttributePair.query()
  return query
}

export function findAttributePairById(id: number) {
  const query = AttributePair
    .query()
    .findById(id)
  return query
}

export function createAttributePair(object: attributePairCreatePayloadType) {
  const query = AttributePair
    .query()
    .insertAndFetch(object)
  return query
}

export function updateAttributePair(id: number, object: attributePairUpdatePayloadType) {
  const query = AttributePair
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteAttributePair(id: number) {
  const query = AttributePair
    .query()
    .deleteById(id)
  return query
}