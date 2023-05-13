import * as yup from 'yup';
import { CategoryToProductValidationSchemas } from "../../validation-schemas/category-to-product.validation"


export type AddCategoryToProductPayload = yup.InferType<typeof CategoryToProductValidationSchemas.addCategoryToProductPayload>
export type RemoveCategoryFromProductPayload = yup.InferType<typeof CategoryToProductValidationSchemas.removeCategoryFromProductPayload>
export type CategoryToProductFindOnePayload = yup.InferType<typeof CategoryToProductValidationSchemas.categoryToProductFindOnePayload>
