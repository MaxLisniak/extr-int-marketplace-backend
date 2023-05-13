import * as yup from 'yup';
import { CategoriesValidationSchemas } from "../../validation-schemas/categories.validation"


export type CategoryFindOnePayload = yup.InferType<typeof CategoriesValidationSchemas.categoryFindOnePayload>
export type CategoryCreatePayload = yup.InferType<typeof CategoriesValidationSchemas.categoryCreatePayload>
export type CategoryUpdatePayload = yup.InferType<typeof CategoriesValidationSchemas.categoryUpdatePayload>
export type CategoryDeletePayload = yup.InferType<typeof CategoriesValidationSchemas.categoryDeletePayload>