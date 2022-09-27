import { Request, Response } from "express";
import { commentSchema } from "../validationSchemas/comment";
import {
  findComments,
  findCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "../services/comments";

export async function findCommentsController(req: Request, res: Response): Promise<void> {
  const { include_user, product_id } = req.query
  const comments = await findComments(
    Number(product_id),
    include_user === "true"
  )
  res.json({ data: comments });
}

export async function findCommentByIdController(req: Request, res: Response): Promise<void> {
  const { include_user } = req.query
  const paramsPayload = commentSchema.validateSync(req.params)
  const comment = await findCommentById(
    paramsPayload.id,
    include_user === "true"
  )
  res.json({ data: comment });
}

export async function createCommentController(req: Request, res: Response): Promise<void> {
  const bodyPayload = commentSchema.validateSync(req.body)
  const comment = await createComment(bodyPayload)
  res.json({ data: comment })
}

export async function updateCommentController(req: Request, res: Response): Promise<void> {
  const bodyPayload = commentSchema.validateSync(req.body)
  const paramsPayload = commentSchema.validateSync(req.params)
  const comment = await updateComment(
    paramsPayload.id,
    bodyPayload
  )
  res.json({ data: comment })
}

export async function deleteCommentController(req: Request, res: Response): Promise<void> {
  const paramsPayload = commentSchema.validateSync(req.params)
  await deleteComment(paramsPayload.id)
  res.sendStatus(200);
}