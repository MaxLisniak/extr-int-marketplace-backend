import {
  keywordCreateType,
  keywordFindOnePayloadType,
  keywordFindPayloadType,
  keywordUpdateType
} from "../validationSchemas/keyword"
import Keyword from "../models/Keyword"

export function findKeywords(payload: keywordFindPayloadType) {
  const query = Keyword.query()
  if (payload.search_query) {
    query.where('keyword', 'like', `%${payload.search_query}%`)
  }
  if (payload.include_product) {
    query.withGraphFetched('product')
  }
  return query
}

export function findKeywordById(payload: keywordFindOnePayloadType) {
  const query = Keyword
    .query()
    .findById(payload.id)
  if (payload.include_product) {
    query.withGraphFetched('product')
  }
  return query
}

export function createKeyword(payload: keywordCreateType) {
  const query = Keyword
    .query()
    .insertAndFetch(payload)
  return query
}

export function updateKeyword(payload: keywordUpdateType) {
  const { id, ...body } = payload
  const query = Keyword
    .query()
    .patchAndFetchById(id, body)
  return query
}

export function deleteKeyword(id: number) {
  const query = Keyword
    .query()
    .deleteById(id)
  return query
}