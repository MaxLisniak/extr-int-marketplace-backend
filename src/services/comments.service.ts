
import { CommentCreatePayload, CommentFindPayload, CommentUpdateByIdPayload } from "../lib/types/comments.types"
import Comment from "../models/comments.model"

async function find(params: CommentFindPayload) {

  const {
    product_id,
    limit,
    offset,
  } = params

  const query = Comment
    .query()
    .where({ product_id })
    .withGraphFetched("user")
    .orderBy("created", 'DESC')
    .limit(limit)

  if (offset) {
    query.offset(offset)
  }

  return await query

}

async function findById(id: number) {
  return await Comment
    .query()
    .findById(id)
}

async function create(object: Partial<CommentCreatePayload & { user_id: number }>) {
  return await Comment
    .query()
    .insertAndFetch(object)
}

async function updateById(id: number, object: CommentUpdateByIdPayload) {
  return await Comment
    .query()
    .patchAndFetchById(id, object)
}

async function deleteById(id: number) {
  return await Comment
    .query()
    .deleteById(id)
}

export const CommentsService = {
  find,
  findById,
  create,
  updateById,
  deleteById,
}