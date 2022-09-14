import { RequestHandler } from "express";
import Category from "../models/Categoty";

export const getAllCategories: RequestHandler =
  async (req, res) => {
    try {
      const categories = await Category.query()
        .orderBy('id', 'DESC');
      return res.send(categories);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getAllCategoriesExtended: RequestHandler =
  async (req, res) => {
    try {
      const categories = await Category.query()
        .withGraphFetched('subcategories')
      return res.send(categories);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getCategoryById: RequestHandler =
  async (req, res) => {
    try {
      const category = await Category
        .query()
        .findById(req.params.id)
        .withGraphFetched('subcategories')
      return res.send(category);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const postCategoty: RequestHandler =
  async (req, res) => {
    try {
      const queryResult = await Category.query()
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

export const patchCategory: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await Category.query()
        .findById(id)
        .patch(req.body);
      if (queryResult) {
        const newObject = await Category.query()
          .findById(id);
        return res.send(newObject);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const deleteCategory: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await Category.query()
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