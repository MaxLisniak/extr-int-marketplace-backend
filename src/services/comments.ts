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

  if (params.product_id) { // TODO: есть ли смысл вытягивать комменты без привязки к продукту?
    query.where("product_id", params.product_id)
  }

  query.limit(COMMENTS_PER_PAGE) // TODO: замени на offset/limit

  if (params.page) {
    query.offset((params.page - 1) * COMMENTS_PER_PAGE)
  }

  query.withGraphFetched("user")
  query.orderBy("created", 'DESC')

  return query;
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