import * as yup from 'yup';
import { KeywordsValidationSchemas } from '../../validation-schemas/keywords.validation';


export type KeywordFindPayload = yup.InferType<typeof KeywordsValidationSchemas.keywordFindPayload>
export type KeywordFindOnePayload = yup.InferType<typeof KeywordsValidationSchemas.keywordFindOnePayload>
export type KeywordUpdatePayload = yup.InferType<typeof KeywordsValidationSchemas.keywordUpdatePayload>
export type KeywordCreatePayload = yup.InferType<typeof KeywordsValidationSchemas.keywordCreatePayload>
export type KeywordDeletePayload = yup.InferType<typeof KeywordsValidationSchemas.keywordDeletePayload>