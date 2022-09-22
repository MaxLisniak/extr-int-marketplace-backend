import { Request, Response, NextFunction } from "express";
import { commentSchema } from "../validationSchemas/comment";
import { deleteComment, getCommentById, getComments, patchComment, postComment } from "../services/comments";

export async function getCommentsController(req: Request, res: Response): Promise<void> {
  const { include_user, product_id } = req.query
  const comments = await getComments(
    Number(product_id),
    include_user === "true"
  )
  res.json({ data: comments });
}

export async function getCommentByIdController(req: Request, res: Response): Promise<void> {
  const { include_user } = req.query
  const paramsPayload = commentSchema.validateSync(req.params)
  const comment = await getCommentById(
    paramsPayload.id,
    include_user === "true"
  )
  res.json({ data: comment });
}

export async function postCommentController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = commentSchema.validateSync(req.body)
  const comment = await postComment(bodyPayload)
  res.json({ data: comment })
}

export async function patchCommentController(req: Request, res: Response, next: NextFunction): Promise<void> {
  const bodyPayload = commentSchema.validateSync(req.body)
  const paramsPayload = commentSchema.validateSync(req.params)
  const comment = await patchComment(
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