import { RequestHandler } from "express";
import Category from "../models/Categoty";
import { categorySchema } from "../validationSchemas/category";

export const getAllCategories: RequestHandler =
  async (req, res, next) => {
    const categories = await Category.query()
      .orderBy('id', 'DESC')
    return res.send(categories);
  }

export const getAllCategoriesExtended: RequestHandler =
  async (req, res, next) => {
    const categories = await Category.query()
      .withGraphFetched('subcategories')
    return res.send(categories);
  }

export const getCategoryById: RequestHandler =
  async (req, res, next) => {
    const category = await Category
      .query()
      .findById(req.params.id)
      .withGraphFetched('subcategories')
    return res.send(category);
  }

export const postCategoty: RequestHandler =
  async (req, res, next) => {
    categorySchema.validate(req.body)
      .catch(err => next(err))
    const category = await Category.query()
      .insertAndFetch(req.body)
    return res.send(category);
  }

export const patchCategory: RequestHandler =
  async (req, res, next) => {
    categorySchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const category = await Category.query()
      .patchAndFetchById(id, req.body)

    return res.send(category);
  }

export const deleteCategory: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Category.query()
      .deleteById(id)

    return res.sendStatus(200);
  }