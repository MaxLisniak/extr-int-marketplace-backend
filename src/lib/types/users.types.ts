import * as yup from 'yup';
import { UsersValidationSchemas } from '../../validation-schemas/users.validation.js';

export type UserFindOnePayload = yup.InferType<typeof UsersValidationSchemas.userFindOnePayload>
export type UserCreatePayload = yup.InferType<typeof UsersValidationSchemas.userCreatePayload>
export type UserUpdatePayload = yup.InferType<typeof UsersValidationSchemas.userUpdatePayload>
export type UserSignInPayload = yup.InferType<typeof UsersValidationSchemas.userSignInPayload>
export type UserDeletePayload = yup.InferType<typeof UsersValidationSchemas.userDeletePayload>