import {
  commentCreatePayloadType,
  commentFindPayloadType,
  commentUpdatePayloadType,

} from "../validationSchemas/comment"
import Comment from "../models/Comment"

export function findComments(params: commentFindPayloadType) {

  const { product_id, limit = 10, offset = 0 } = params

  return Comment
    .query()
    .where({ product_id })
    .offset(offset)
    .limit(limit)
    .withGraphFetched("user")
    .orderBy("created", 'DESC')
}

export function findCommentById(id: number) {
  return Comment
    .query()
    .findById(id)
    .withGraphFetched("user")
}

export function createComment(object: commentCreatePayloadType) { // TODO: добавь еще и рейтинг товара 1-5 звезд
  return Comment
    .query()
    .insertAndFetch(object)
}

export function updateComment(id: number, object: commentUpdatePayloadType) {
  return Comment
    .query()
    .patchAndFetchById(id, object)
}

export function deleteComment(id: number) {
  return Comment
    .query()
    .deleteById(id)
}