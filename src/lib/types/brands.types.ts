import * as yup from 'yup';
import { BrandsValidationSchemas } from "../../validation-schemas/brands.validation"


export type BrandFindPayload = yup.InferType<typeof BrandsValidationSchemas.brandFindPayload>
export type BrandFindOnePayload = yup.InferType<typeof BrandsValidationSchemas.brandFindOnePayload>
export type BrandCreatePayload = yup.InferType<typeof BrandsValidationSchemas.brandCreatePayload>
export type BrandUpdatePayload = yup.InferType<typeof BrandsValidationSchemas.brandUpdatePayload>
export type BrandDeletePayload = yup.InferType<typeof BrandsValidationSchemas.brandDeletePayload>