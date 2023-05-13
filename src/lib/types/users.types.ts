import * as yup from 'yup';
import { UsersValidationSchemas } from '../../validation-schemas/users.validation.js';

export type UserFindPayload = yup.InferType<typeof UsersValidationSchemas.findPayload>
export type UserFindByIdPayload = yup.InferType<typeof UsersValidationSchemas.findByIdPayload>
export type UserCreatePayload = yup.InferType<typeof UsersValidationSchemas.createPayload>
export type UserUpdateByIdPayload = yup.InferType<typeof UsersValidationSchemas.updateByIdPayload>
export type UserDeleteByIdPayload = yup.InferType<typeof UsersValidationSchemas.deleteByIdPayload>
export type UserSignInPayload = yup.InferType<typeof UsersValidationSchemas.signInPayload>