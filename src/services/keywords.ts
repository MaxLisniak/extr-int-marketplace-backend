import { keywordType } from "../validationSchemas/keyword"
import Keyword from "../models/Keyword"

export function getKeywords(
  search_query?: string | undefined,
  include_product?: Boolean
) {
  const query = Keyword.query()
  if (search_query) {
    query.where('keyword', 'like', `%${search_query}%`)
  }
  if (include_product) {
    query.withGraphFetched('product')
  }
  return query
}

export function getKeywordById(
  id: number,
  include_product: Boolean
) {
  const query = Keyword
    .query()
    .findById(id)
  if (include_product) {
    query.withGraphFetched('product')
  }
  return query
}

export function postKeyword(
  payload: keywordType
) {
  const query = Keyword
    .query()
    .insertAndFetch(payload)
  return query
}

export function patchKeyword(
  id: number,
  payload: keywordType
) {
  const query = Keyword
    .query()
    .patchAndFetchById(id, payload)
  return query
}

export function deleteKeyword(id: number) {
  const query = Keyword
    .query()
    .deleteById(id)
  return query
}