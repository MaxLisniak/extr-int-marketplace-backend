import * as yup from 'yup';
import { AttributeValuesValidationSchemas } from "../../validation-schemas/attribute-values.validation"

export type AttributeValueFindPayload = yup.InferType<typeof AttributeValuesValidationSchemas.attributeValueFindPayload>
export type AttributeValueFindOnePayload = yup.InferType<typeof AttributeValuesValidationSchemas.attributeValueFindOnePayload>
export type AttributeValueCreatePayload = yup.InferType<typeof AttributeValuesValidationSchemas.attributeValueCreatePayload>
export type AttributeValueUpdatePayload = yup.InferType<typeof AttributeValuesValidationSchemas.attributeValueUpdatePayload>
export type AttributeValueDeletePayload = yup.InferType<typeof AttributeValuesValidationSchemas.attributeValueDeletePayload>