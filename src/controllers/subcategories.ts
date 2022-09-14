import { RequestHandler } from "express";
import Subcategory from "../models/Subcategory";
import Category from "../models/Categoty";

export const getAllSubcategories: RequestHandler =
  async (req, res) => {
    const subcategories =
      await Subcategory.query()
    return res.send(subcategories);
  }

export const getSubcategoryById: RequestHandler =
  async (req, res) => {
    const subcategory =
      await Subcategory.query()
        .findById(req.params.id)
        .withGraphFetched("category")
    return res.send(subcategory);
  }

export const getSubcategoryByCategoryId: RequestHandler =
  async (req, res) => {
    const id = req.params.id;
    const subcategories =
      await Category
        .relatedQuery('subcategories')
        .for(id)
    return res.send(subcategories);
  }

export const postSubcategory: RequestHandler =
  async (req, res) => {
    const queryResult = await Subcategory.query()
      .insert(req.body);
    if (queryResult) {
      return res.send(queryResult);
    }
    else res.sendStatus(400)
  }

export const patchSubcategory: RequestHandler =
  async (req, res,) => {
    const id = req.params.id
    const queryResult = await Subcategory.query()
      .findById(id)
      .patch(req.body);
    if (queryResult) {
      const newObject = await Subcategory.query()
        .findById(id);
      return res.send(newObject);
    }
    else res.sendStatus(400)
  }

export const deleteSubcategory: RequestHandler =
  async (req, res) => {
    const id = req.params.id
    const queryResult = await Subcategory.query()
      .deleteById(id)
    if (queryResult)
      return res.sendStatus(200);
    else
      return res.sendStatus(400);
  }