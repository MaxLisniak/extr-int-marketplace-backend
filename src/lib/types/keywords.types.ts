import * as yup from 'yup';
import { KeywordsValidationSchemas } from '../../validation-schemas/keywords.validation';


export type KeywordFindPayload = yup.InferType<typeof KeywordsValidationSchemas.findPayload>
export type KeywordFindByIdPayload = yup.InferType<typeof KeywordsValidationSchemas.findByIdPayload>
export type KeywordUpdateByIdPayload = yup.InferType<typeof KeywordsValidationSchemas.updateByIdPayload>
export type KeywordCreatePayload = yup.InferType<typeof KeywordsValidationSchemas.createPayload>
export type KeywordDeleteByIdPayload = yup.InferType<typeof KeywordsValidationSchemas.deleteByIdPayload>