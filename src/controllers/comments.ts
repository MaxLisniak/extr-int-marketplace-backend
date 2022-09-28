import { Request, Response } from "express";
import {
  commentFindPayloadSchema,
  commentCreatePayloadSchema,
  commentUpdatePayloadSchema,
  commentFindOnePayloadSchema
} from "../validationSchemas/comment";
import {
  findComments,
  findCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "../services/comments";
import { idSchema } from "../validationSchemas/id";

export async function findCommentsController(req: Request, res: Response): Promise<void> {
  const payload = commentFindPayloadSchema
    .validateSync(req.query, { stripUnknown: true })
  const comments = await findComments(payload)
  res.json({ data: comments });
}

export async function findCommentByIdController(req: Request, res: Response): Promise<void> {
  const payload = commentFindOnePayloadSchema
    .validateSync({ ...req.query, ...req.params })
  const comment = await findCommentById(payload)
  res.json({ data: comment });
}

export async function createCommentController(req: Request, res: Response): Promise<void> {
  const payload = commentCreatePayloadSchema
    .validateSync(req.body, { stripUnknown: true })
  const comment = await createComment(payload)
  res.json({ data: comment })
}

export async function updateCommentController(req: Request, res: Response): Promise<void> {
  const payload = commentUpdatePayloadSchema
    .validateSync({ ...req.body, ...req.params }, { stripUnknown: true })
  const comment = await updateComment(payload)
  res.json({ data: comment })
}

export async function deleteCommentController(req: Request, res: Response): Promise<void> {
  const payload = idSchema.validateSync(req.params, { stripUnknown: true })
  await deleteComment(payload.id)
  res.sendStatus(200);
}