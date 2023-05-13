
import * as yup from 'yup';
import { CommentsValidationSchemas } from "../../validation-schemas/comments.validation"

export type CommentFindPayload = yup.InferType<typeof CommentsValidationSchemas.commentFindPayload>
export type CommentFindOnePayload = yup.InferType<typeof CommentsValidationSchemas.commentFindOnePayload>
export type CommentCreatePayload = yup.InferType<typeof CommentsValidationSchemas.commentCreatePayload>
export type CommentUpdatePayload = yup.InferType<typeof CommentsValidationSchemas.commentUpdatePayload>
export type CommentDeletePayload = yup.InferType<typeof CommentsValidationSchemas.commentDeletePayload>