import { Request, Response } from "express";
import { CommentsService } from "../services/comments.service";
import { CommentsValidationSchemas } from "../validation-schemas/comments.validation";
import { UsersService } from "../services/users.service";
import { CommentCreatePayload } from "../lib/types/comments.types";


async function find(req: Request, res: Response): Promise<void> {
  const payload = await CommentsValidationSchemas.findPayload
    .validate(req.query, { stripUnknown: true })
  const comments = await CommentsService.find(payload)
  res.json({ data: comments });
}

async function create(req: Request, res: Response): Promise<void> {
  const payload: Partial<CommentCreatePayload & { user_id: number }> = await CommentsValidationSchemas.createPayload
    .validate(req.body, { stripUnknown: true })

  const refreshToken = req.cookies.refreshToken
  const user = await UsersService.findByRefreshToken(refreshToken)
  payload.user_id = user.id

  const comment = await CommentsService.create(payload)
  res.json({ data: comment })
}

async function updateById(req: Request, res: Response): Promise<void> {
  const payload = await CommentsValidationSchemas.updateByIdPayload
    .validate({ ...req.body, ...req.params }, { stripUnknown: true })

  const refreshToken = req.cookies.refreshToken
  const user = await UsersService.findByRefreshToken(refreshToken)

  let comment = await CommentsService.findById(payload.id)
  if (comment.user_id !== user.id) {
    res.sendStatus(403)
    return
  }

  comment = await CommentsService.updateById(payload.id, payload)
  res.json({ data: comment })
}

async function deleteById(req: Request, res: Response): Promise<void> {
  const payload = await CommentsValidationSchemas.deleteByIdPayload
    .validate(req.params, { stripUnknown: true })

  const refreshToken = req.cookies.refreshToken
  const user = await UsersService.findByRefreshToken(refreshToken)

  const comment = await CommentsService.findById(payload.id)
  if (comment.user_id !== user.id) {
    res.sendStatus(403)
    return
  }

  await CommentsService.deleteById(payload.id)
  res.sendStatus(200);
}

export const CommentsController = {
  find,
  create,
  updateById,
  deleteById,
}