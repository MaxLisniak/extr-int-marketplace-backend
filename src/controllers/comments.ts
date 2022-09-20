import { Request, Response, NextFunction } from "express";
import { commentSchema } from "../validationSchemas/comment";
import Comment from "../models/Comment";

export async function getAllComments
  (req: Request, res: Response): Promise<void> {
  const { include_user, product_id } = req.query

  let query = Comment
    .query()

  if (product_id) {
    query = query
      .where("product_id", Number(product_id))
  }
  if (include_user === "true") {
    query = query
      .withGraphFetched("user")
  }
  query = query
    .orderBy("created", 'DESC')

  const comments = await query;
  res.send({ data: { comments } });
}

// export async function getCommentsForProductId
//   (req: Request, res: Response): Promise<void> {
//   const { id } = req.params;
//   const comments = await Comment.query()
//     .where("product_id", id)
//     .orderBy("created", 'DESC')
//     .withGraphFetched("user")

//   res.send({ data: { comments } });
// }

export async function getCommentById
  (req: Request, res: Response): Promise<void> {
  const { include_user } = req.query

  let query = Comment
    .query()
    .findById(req.params.id)

  if (include_user === "true") {
    query = query
      .withGraphFetched("user")
  }

  const comment = await query
  res.send({ data: { comment } });
}

export async function postComment
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  commentSchema.validate(req.body)
    .catch(err => next(err))
  const comment = await Comment
    .query()
    .insertAndFetch(req.body)
  res.send({ data: { comment } })
}

export async function patchComment
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  commentSchema.validate(req.body)
    .catch(err => next(err))
  const id = req.params.id
  const comment = await Comment
    .query()
    .patchAndFetchById(id, req.body)
  res.send({ data: { comment } })
}

export async function deleteComment
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const queryResult = await Comment
    .query()
    .deleteById(id)
  res.sendStatus(200);
}