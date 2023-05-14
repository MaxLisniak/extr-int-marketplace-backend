import Keyword from '../models/keywords.model';
import * as yup from 'yup';
import { id, limit, offset } from './common.validation';

const search_query = yup
  .string()

const keyword = yup
  .string()
  .min(1)
  .max(64)

const findPayload = yup.object().shape({
  search_query: search_query,
  limit: limit,
  offset: offset,
})

const findByIdPayload = yup.object().shape({
  id: id
    .required(),
})

const createPayload = yup.object().shape({
  keyword: keyword
    .required(),
})

const updateByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'keywordUpdate-entryDoesNotExist',
      "Can't update keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    ),
  keyword: keyword
})

const deleteByIdPayload = yup.object().shape({
  id: id
    .required()
    .test(
      'keywordDelete-entryDoesNotExist',
      "Can't delete keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    )
})

export const KeywordsValidationSchemas = {
  findPayload,
  findByIdPayload,
  createPayload,
  updateByIdPayload,
  deleteByIdPayload,
}

