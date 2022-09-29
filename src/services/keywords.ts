import {
  keywordCreateType,
  keywordFindOnePayloadType,
  keywordFindPayloadType,
  keywordUpdateType
} from "../validationSchemas/keyword"
import Keyword from "../models/Keyword"

export function findKeywords(params: keywordFindPayloadType) {
  const query = Keyword.query()
  if (params.search_query) {
    query.where('keyword', 'like', `%${params.search_query}%`)
  }
  query.withGraphFetched('product')
  return query
}

export function findKeywordById(id: number) {
  const query = Keyword
    .query()
    .findById(id)
  query.withGraphFetched('product')
  return query
}

export function createKeyword(object: keywordCreateType) {
  const query = Keyword
    .query()
    .insertAndFetch(object)
  return query
}

export function updateKeyword(id: number, object: keywordUpdateType) {
  const query = Keyword
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteKeyword(id: number) {
  const query = Keyword
    .query()
    .deleteById(id)
  return query
}