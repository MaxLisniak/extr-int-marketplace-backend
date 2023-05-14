import * as yup from 'yup';
import { CategoriesValidationSchemas } from "../../validation-schemas/categories.validation"

export type CategoryFindPayload = yup.InferType<typeof CategoriesValidationSchemas.findPayload>
export type CategoryFindByIdPayload = yup.InferType<typeof CategoriesValidationSchemas.findByIdPayload>
export type CategoryCreatePayload = yup.InferType<typeof CategoriesValidationSchemas.createPayload>
export type CategoryUpdateByIdPayload = yup.InferType<typeof CategoriesValidationSchemas.updateByIdPayload>
export type CategoryDeleteByIdPayload = yup.InferType<typeof CategoriesValidationSchemas.deleteByIdPayload>
export type CategoryAddProductPayload = yup.InferType<typeof CategoriesValidationSchemas.addProductPayload>
export type CategoryRemoveProductPayload = yup.InferType<typeof CategoriesValidationSchemas.removeProductPayload>
