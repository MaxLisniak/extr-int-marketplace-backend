
import { CommentCreatePayload, CommentFindPayload, CommentUpdatePayload } from "../lib/types/comments.types"
import Comment from "../models/comments.model"

async function findComments(params: CommentFindPayload) {

  const { product_id, limit = 10, offset = 0 } = params

  return await Comment
    .query()
    .where({ product_id })
    .offset(offset)
    .limit(limit)
    .withGraphFetched("user")
    .orderBy("created", 'DESC')
}

async function findCommentById(id: number) {
  return await Comment
    .query()
    .findById(id)
    .withGraphFetched("user")
}

async function createComment(object: CommentCreatePayload) {
  return await Comment
    .query()
    .insertAndFetch(object)
}

async function updateComment(id: number, object: CommentUpdatePayload) {
  return await Comment
    .query()
    .patchAndFetchById(id, object)
}

async function deleteComment(id: number) {
  return await Comment
    .query()
    .deleteById(id)
}

export const CommentsService = {
  findComments,
  findCommentById,
  createComment,
  updateComment,
  deleteComment,
}