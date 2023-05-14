import * as yup from 'yup';
import { BrandsValidationSchemas } from "../../validation-schemas/brands.validation"


export type BrandFindPayload = yup.InferType<typeof BrandsValidationSchemas.findPayload>
export type BrandFindByIdPayload = yup.InferType<typeof BrandsValidationSchemas.findByIdPayload>
export type BrandCreatePayload = yup.InferType<typeof BrandsValidationSchemas.createPayload>
export type BrandUpdateByIdPayload = yup.InferType<typeof BrandsValidationSchemas.updateByIdPayload>
export type BrandDeleteByIdPayload = yup.InferType<typeof BrandsValidationSchemas.deleteByIdPaylaod>