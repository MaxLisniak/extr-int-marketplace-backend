import { RequestHandler } from "express";
import Subcategory from "../models/Subcategory";
import Category from "../models/Categoty";
import { subcategorySchema } from "../validationSchemas/subcategory";

export const getAllSubcategories: RequestHandler =
  async (req, res, next) => {
    const subcategories = await Subcategory
      .query()
      .catch(error => next(error))
    return res.send(subcategories);
  }

export const getSubcategoryById: RequestHandler =
  async (req, res, next) => {
    const subcategory = await Subcategory
      .query()
      .findById(req.params.id)
      .withGraphFetched("category")
      .catch(error => next(error))
    return res.send(subcategory);
  }

export const getSubcategoryByCategoryId: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id;
    const subcategories = await Category
      .relatedQuery('subcategories')
      .for(id)
      .catch(error => next(error))
    return res.send(subcategories);
  }

export const postSubcategory: RequestHandler =
  async (req, res, next) => {
    subcategorySchema.validate(req.body)
      .catch(err => next(err))
    const subcategory = await Subcategory
      .query()
      .insertAndFetch(req.body)
      .catch(error => next(error))
    return res.send(subcategory)
  }

export const patchSubcategory: RequestHandler =
  async (req, res, next) => {
    subcategorySchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const subcategory = await Subcategory
      .query()
      .patchAndFetchById(id, req.body)
      .catch(error => next(error))
    return res.send(subcategory)
  }

export const deleteSubcategory: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Subcategory
      .query()
      .deleteById(id)
      .catch(error => next(error))
    return res.sendStatus(200);
  }