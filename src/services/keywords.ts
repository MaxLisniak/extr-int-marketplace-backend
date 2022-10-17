import {
  keywordCreateType,
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
  return Keyword
    .query()
    .insertAndFetch(object)
}

export function updateKeyword(id: number, object: keywordUpdateType) {
  return Keyword
    .query()
    .patchAndFetchById(id, object)
}

export function deleteKeyword(id: number) {
  return Keyword
    .query()
    .deleteById(id)
}