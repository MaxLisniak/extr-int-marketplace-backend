// import { RequestHandler } from "express";
import { Request, Response, NextFunction } from 'express';

import Category from "../models/Categoty";
import { categorySchema } from "../validationSchemas/category";

export async function getAllCategories
  (req: Request, res: Response): Promise<void> {
  const categories = await Category.query()
    .orderBy('id', 'DESC')
  res.send({ data: { categories } });
}

export async function getAllCategoriesExtended
  (req: Request, res: Response): Promise<void> {
  const categories = await Category.query()
    .withGraphFetched('subcategories')
  res.send({ data: { categories } });
}

export async function getCategoryById
  (req: Request, res: Response): Promise<void> {
  const category = await Category
    .query()
    .findById(req.params.id)
    .withGraphFetched('subcategories')
  res.send({ data: { category } });
}

export async function postCategory
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  categorySchema.validate(req.body)
    .catch(err => next(err))
  const category = await Category
    .query()
    .insertAndFetch(req.body)
  res.send({ data: { category } });
}

export async function patchCategory
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  categorySchema.validate(req.body)
    .catch(err => next(err))
  const id = req.params.id
  const category = await Category
    .query()
    .patchAndFetchById(id, req.body)
  res.send({ data: { category } });
}

export async function deleteCategory
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const queryResult = await Category.query()
    .deleteById(id)
  res.sendStatus(200);
}