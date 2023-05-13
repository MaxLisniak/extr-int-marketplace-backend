
import { KeywordCreatePayload, KeywordFindPayload, KeywordUpdatePayload } from "../lib/types/keywords.types"
import Keyword from "../models/keywords.model"

async function findKeywords(params: KeywordFindPayload) {
  const query = Keyword.query()

  if (params.search_query) {
    query.where('keyword', 'like', `%${params.search_query}%`)
  }

  query.withGraphFetched('product')

  return await query
}

async function findKeywordById(id: number) {
  const query = Keyword
    .query()
    .findById(id)

  query.withGraphFetched('product')

  return await query
}

async function createKeyword(object: KeywordCreatePayload) {
  return await Keyword
    .query()
    .insertAndFetch(object)
}

async function updateKeyword(id: number, object: KeywordUpdatePayload) {
  return await Keyword
    .query()
    .patchAndFetchById(id, object)
}

async function deleteKeyword(id: number) {
  return await Keyword
    .query()
    .deleteById(id)
}

export const KeywordsService = {
  findKeywords,
  findKeywordById,
  createKeyword,
  updateKeyword,
  deleteKeyword,
}