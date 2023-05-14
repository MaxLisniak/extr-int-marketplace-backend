
import * as yup from 'yup';
import { CommentsValidationSchemas } from "../../validation-schemas/comments.validation"

export type CommentFindPayload = yup.InferType<typeof CommentsValidationSchemas.findPayload>
export type CommentCreatePayload = yup.InferType<typeof CommentsValidationSchemas.createPayload>
export type CommentUpdateByIdPayload = yup.InferType<typeof CommentsValidationSchemas.updateByIdPayload>
export type CommentDeleteByIdPayload = yup.InferType<typeof CommentsValidationSchemas.deleteByIdPayload>