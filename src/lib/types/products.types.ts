import * as yup from 'yup';
import { ProductsValidationSchemas } from '../../validation-schemas/products.validation';

export type ProductFindByIdPayload = yup.InferType<typeof ProductsValidationSchemas.findByIdPayload>
export type ProductFindByFiltersPayload = yup.InferType<typeof ProductsValidationSchemas.findByFiltersPayload>
export type ProductUpdateByIdPayload = yup.InferType<typeof ProductsValidationSchemas.updateByIdPayload>
export type ProductCreatePayload = yup.InferType<typeof ProductsValidationSchemas.createPayload>
export type ProductDeleteByIdPayload = yup.InferType<typeof ProductsValidationSchemas.deleteByIdPayload> 
