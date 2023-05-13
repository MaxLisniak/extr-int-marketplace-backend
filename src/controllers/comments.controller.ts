import { Request, Response } from "express";
import { CommentsService } from "../services/comments.service";
import { CommentsValidationSchemas } from "../validation-schemas/comments.validation";


async function findComments(req: Request, res: Response): Promise<void> {
  const payload = await CommentsValidationSchemas.commentFindPayload
    .validate(req.query, { stripUnknown: true })
  const comments = await CommentsService.findComments(payload)
  res.json({ data: comments });
}

async function findCommentById(req: Request, res: Response): Promise<void> {
  const payload = await CommentsValidationSchemas.commentFindOnePayload
    .validate(req.params, { stripUnknown: true })
  const comment = await CommentsService.findCommentById(payload.id)
  res.json({ data: comment });
}

async function createComment(req: Request, res: Response): Promise<void> {
  const payload = await CommentsValidationSchemas.commentCreatePayload
    .validate(req.body, { stripUnknown: true })
  const comment = await CommentsService.createComment(payload)
  res.json({ data: comment })
}

async function updateComment(req: Request, res: Response): Promise<void> {
  const payload = await CommentsValidationSchemas.commentUpdatePayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })
  const comment = await CommentsService.updateComment(payload.id, payload)
  res.json({ data: comment })
}

async function deleteComment(req: Request, res: Response): Promise<void> {
  const payload = await CommentsValidationSchemas.commentDeletePayload
    .validate(req.params, { stripUnknown: true })
  await CommentsService.deleteComment(payload.id)
  res.sendStatus(200);
}

export const CommentsController = {
  findComments,
  findCommentById,
  createComment,
  updateComment,
  deleteComment,
}