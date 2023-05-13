import * as yup from 'yup';
import { AttributeNamesValidationSchemas } from "../../validation-schemas/attribute-names.validation"

export type AttributeNameFindPayload = yup.InferType<typeof AttributeNamesValidationSchemas.attributeNameFindPayload>
export type AttributeNameFindOnePayload = yup.InferType<typeof AttributeNamesValidationSchemas.attributeNameFindOnePayload>
export type AttributeNameCreatePayload = yup.InferType<typeof AttributeNamesValidationSchemas.attributeNameCreatePayload>
export type AttributeNameUpdatePayload = yup.InferType<typeof AttributeNamesValidationSchemas.attributeNameUpdatePayload>
export type AttributeNameDeletePayload = yup.InferType<typeof AttributeNamesValidationSchemas.attributeNameDeletePayload>