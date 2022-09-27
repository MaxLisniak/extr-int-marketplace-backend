import { commentType } from "../validationSchemas/comment"
import Comment from "../models/Comment"

export function findComments(
  product_id?: number,
  include_user?: Boolean
) {
  const query = Comment
    .query()

  if (product_id) {
    query.where("product_id", product_id)
  }
  if (include_user) {
    query.withGraphFetched("user")
  }
  query.orderBy("created", 'DESC')
  return query;
}

export function findCommentById(
  id: number,
  include_user?: Boolean
) {
  const query = Comment
    .query()
    .findById(id)

  if (include_user) {
    query.withGraphFetched("user")
  }
  return query
}

export function createComment(payload: commentType) {
  const query = Comment
    .query()
    .insertAndFetch(payload)
  return query
}

export function updateComment(id: number, payload: commentType) {
  const query = Comment
    .query()
    .patchAndFetchById(id, payload)
  return query
}

export function deleteComment(id: number) {
  const query = Comment
    .query()
    .deleteById(id)
  return query
}