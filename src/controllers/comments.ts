import { RequestHandler } from "express";
import { commentSchema } from "../validationSchemas/comment";
import Comment from "../models/Comment";

export const getAllComments: RequestHandler =
  async (req, res, next) => {
    const comments = await Comment
      .query()
      .withGraphFetched("user")
      .catch(error => next(error))
    return res.send(comments);
  }

export const getCommentsForProductId: RequestHandler =
  async (req, res, next) => {
    const { id } = req.params;
    const comments = await Comment.query()
      .where("product_id", id)
      .orderBy("created", 'DESC')
      .withGraphFetched("user")
      .catch(error => next(error))
    return res.send(comments);
  }

export const getCommentById: RequestHandler =
  async (req, res, next) => {
    const comment = await Comment
      .query()
      .findById(req.params.id)
      .withGraphFetched("user")
      .catch(error => next(error))
    return res.send(comment);
  }

export const postComment: RequestHandler =
  async (req, res, next) => {
    commentSchema.validate(req.body)
      .catch(err => next(err))
    const comment = await Comment
      .query()
      .insertAndFetch(req.body)
      .catch(error => next(error))
    return res.send(comment)
  }

export const patchComment: RequestHandler =
  async (req, res, next) => {
    commentSchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const comment = await Comment
      .query()
      .patchAndFetchById(id, req.body)
      .catch(error => next(error))
    return res.send(comment)
  }

export const deleteComment: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Comment
      .query()
      .deleteById(id)
      .catch(error => next(error))
    return res.sendStatus(200);
  }