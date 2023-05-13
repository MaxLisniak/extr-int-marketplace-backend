import * as yup from 'yup';
import { AttributeToProductValidationSchemas } from "../../validation-schemas/attribute-to-product.validation"

export type AddAttributeToProductPayload = yup.InferType<typeof AttributeToProductValidationSchemas.addAttributeToProductPayload>
export type RemoveAttributeFromProductPayload = yup.InferType<typeof AttributeToProductValidationSchemas.removeAttributeFromProductPayload>
export type AttributeToProductFindOnePayload = yup.InferType<typeof AttributeToProductValidationSchemas.attributeToProductFindOnePayload>