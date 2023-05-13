import * as yup from 'yup';
import { KeywordToProductValidationSchemas } from '../../validation-schemas/keyword-to-product.validation';


export type AddKeywordToProductPayload = yup.InferType<typeof KeywordToProductValidationSchemas.addKeywordToProductPayload>
export type RemoveKeywordFromProductPayload = yup.InferType<typeof KeywordToProductValidationSchemas.removeKeywordFromProductPayload>
export type KeywordToProductFindOnePayload = yup.InferType<typeof KeywordToProductValidationSchemas.keywordToProductFindOnePayload>
