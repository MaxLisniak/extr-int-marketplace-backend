import {
  commentCreatePayloadType,
  commentFindPayloadType,
  commentUpdatePayloadType,

} from "../validationSchemas/comment"
import Comment from "../models/Comment"

const COMMENTS_PER_PAGE = 1

export function findComments(params: commentFindPayloadType) {
  const query = Comment
    .query()

  if (params.product_id) {
    query.where("product_id", params.product_id)
  }

  query.limit(COMMENTS_PER_PAGE)
  if (params.page) {
    query.offset((params.page - 1) * COMMENTS_PER_PAGE)
  }
  query.withGraphFetched("user")
  query.orderBy("created", 'DESC')
  return query;
}

export function findCommentById(id: number) {
  const query = Comment
    .query()
    .findById(id)
    .withGraphFetched("user")
  return query
}

export function createComment(object: commentCreatePayloadType) {
  const query = Comment
    .query()
    .insertAndFetch(object)
  return query
}

export function updateComment(id: number, object: commentUpdatePayloadType) {
  const query = Comment
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteComment(id: number) {
  const query = Comment
    .query()
    .deleteById(id)
  return query
}