import * as yup from 'yup';
import { ProductsValidationSchemas } from '../../validation-schemas/products.validation';

export type ProductFindOnePayload = yup.InferType<typeof ProductsValidationSchemas.productFindOnePayload>
export type FilterPayload = yup.InferType<typeof ProductsValidationSchemas.filterPayload>
export type ProductUpdatePayload = yup.InferType<typeof ProductsValidationSchemas.productUpdatePayload>
export type ProductCreatePayload = yup.InferType<typeof ProductsValidationSchemas.productCreatePayload>
export type ProductDeletePayload = yup.InferType<typeof ProductsValidationSchemas.productDeletePayload> 
