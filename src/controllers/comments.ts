import { RequestHandler } from "express";
import Comment from "../models/Comment";

export const getAllComments: RequestHandler =
  async (req, res) => {
    try {
      const comments = await Comment.query()
        .withGraphFetched("user")
      return res.send(comments);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getCommentsForProductId: RequestHandler =
  async (req, res) => {
    try {
      const { id } = req.params;
      const comments = await Comment.query()
        .where("product_id", id)
        .orderBy("created", 'DESC')
        .withGraphFetched("user")
      return res.send(comments);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getCommentById: RequestHandler =
  async (req, res) => {
    try {
      const comment = await Comment
        .query()
        .findById(req.params.id)
        .withGraphFetched("user")
      return res.send(comment);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const postComment: RequestHandler =
  async (req, res) => {
    try {
      const queryResult = await Comment.query()
        .insert(req.body);
      if (queryResult) {
        return res.send(queryResult);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const patchComment: RequestHandler =
  async (req, res,) => {
    try {
      const id = req.params.id
      const queryResult = await Comment.query()
        .findById(id)
        .patch(req.body);
      if (queryResult) {
        const newObject = await Comment.query()
          .findById(id);
        return res.send(newObject);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const deleteComment: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await Comment.query()
        .deleteById(id)
      if (queryResult)
        return res.sendStatus(200);
      else
        return res.sendStatus(400);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }