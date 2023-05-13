import Keyword from '../models/keywords.model';
import * as yup from 'yup';


const keywordFindPayload = yup.object().shape({
  search_query: yup
    .string(),
})

const keywordFindOnePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required(),
})

const keywordCreatePayload = yup.object().shape({
  keyword: yup
    .string()
    .min(1)
    .max(64)
    .required(),
})

const keywordUpdatePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'keywordUpdate-entryDoesNotExist',
      "Can't update keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    ),
  keyword: yup
    .string()
    .min(1)
    .max(64),
})

const keywordDeletePayload = yup.object().shape({
  id: yup
    .number()
    .integer()
    .positive()
    .required()
    .test(
      'keywordDelete-entryDoesNotExist',
      "Can't delete keyword, it does not exist",
      async value => Boolean(await Keyword.query().findById(value))
    )
})

export const KeywordsValidationSchemas = {
  keywordFindPayload,
  keywordFindOnePayload,
  keywordCreatePayload,
  keywordUpdatePayload,
  keywordDeletePayload,
}

