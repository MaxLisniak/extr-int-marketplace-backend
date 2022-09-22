import { commentType } from "../validationSchemas/comment"
import Comment from "../models/Comment"

export function getComments(
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

export function getCommentById(
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

export function postComment(payload: commentType) {
  const query = Comment
    .query()
    .insertAndFetch(payload)
  return query
}

export function patchComment(id: number, payload: commentType) {
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