import {
  commentCreatePayloadType,
  commentFindOnePayloadType,
  commentFindPayloadType,
  commentUpdatePayloadType,

} from "../validationSchemas/comment"
import Comment from "../models/Comment"

export function findComments(payload: commentFindPayloadType) {
  const query = Comment
    .query()

  if (payload.product_id) {
    query.where("product_id", payload.product_id)
  }
  if (payload.include_user) {
    query.withGraphFetched("user")
  }
  query.orderBy("created", 'DESC')
  return query;
}

export function findCommentById(payload: commentFindOnePayloadType) {
  const query = Comment
    .query()
    .findById(payload.id)

  if (payload.include_user) {
    query.withGraphFetched("user")
  }
  return query
}

export function createComment(payload: commentCreatePayloadType) {
  const query = Comment
    .query()
    .insertAndFetch(payload)
  return query
}

export function updateComment(payload: commentUpdatePayloadType) {
  const { id, ...body } = payload
  const query = Comment
    .query()
    .patchAndFetchById(id, body)
  return query
}

export function deleteComment(id: number) {
  const query = Comment
    .query()
    .deleteById(id)
  return query
}