import { Request, Response } from "express";
import {
  commentFindPayloadSchema,
  commentCreatePayloadSchema,
  commentUpdatePayloadSchema,
  commentFindOnePayloadSchema,
  commentDeletePayloadSchema
} from "../validationSchemas/comment";
import {
  findComments,
  findCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "../services/comments";

export async function findCommentsController(req: Request, res: Response): Promise<void> {
  const payload = commentFindPayloadSchema
    .validateSync(req.query, { stripUnknown: true })
  const comments = await findComments(payload)
  res.json({ data: comments });
}

export async function findCommentByIdController(req: Request, res: Response): Promise<void> {
  const payload = commentFindOnePayloadSchema
    .validateSync(req.params, { stripUnknown: true })
  const comment = await findCommentById(payload.id)
  res.json({ data: comment });
}

export async function createCommentController(req: Request, res: Response): Promise<void> {
  const payload = await commentCreatePayloadSchema
    .validate(req.body, { stripUnknown: true })
  const comment = await createComment(payload)
  res.json({ data: comment })
}

export async function updateCommentController(req: Request, res: Response): Promise<void> {
  const payload = await commentUpdatePayloadSchema
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const comment = await updateComment(payload.id, payload)
  res.json({ data: comment })
}

export async function deleteCommentController(req: Request, res: Response): Promise<void> {
  const payload = await commentDeletePayloadSchema
    .validate(req.params, { stripUnknown: true })
  await deleteComment(payload.id)
  res.sendStatus(200);
}