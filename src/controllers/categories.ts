import { RequestHandler } from "express";
import Category from "../models/Categoty";

export const getAllCategories: RequestHandler =
  async (req, res, next) => {
    const categories = await Category.query()
      .orderBy('id', 'DESC')
      .catch(error => next(error));
    return res.send(categories);
  }

export const getAllCategoriesExtended: RequestHandler =
  async (req, res, next) => {
    const categories = await Category.query()
      .withGraphFetched('subcategories')
      .catch(error => next(error))
    return res.send(categories);
  }

export const getCategoryById: RequestHandler =
  async (req, res, next) => {
    const category = await Category
      .query()
      .findById(req.params.id)
      .withGraphFetched('subcategories')
      .catch(error => next(error))
    return res.send(category);
  }

export const postCategoty: RequestHandler =
  async (req, res, next) => {
    const category = await Category.query()
      .insert(req.body)
      .catch(error => next(error));
    return res.send(category);
  }

export const patchCategory: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const category = await Category.query()
      .patchAndFetchById(id, req.body)
      .catch(error => next(error))
    return res.send(category);
  }

export const deleteCategory: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Category.query()
      .deleteById(id)
      .catch(error => next(error))
    return res.send(queryResult);
  }