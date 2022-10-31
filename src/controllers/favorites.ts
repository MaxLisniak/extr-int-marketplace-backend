import { Request, Response } from "express";
import { findFavoriteProducts } from "../services/favorites";
import { addFavoriteProduct, removeFavoriteProduct } from "../services/favorites";
import { addFavoritePayloadSchema, favoriteProductsFindPayloadSchema, removeFavoritePayloadSchema } from "../validationSchemas/favorite";

export async function addFavoriteProductController(req: Request, res: Response): Promise<void> {
  const payload = await addFavoritePayloadSchema
    .validate(req.body, { stripUnknown: true })
  await addFavoriteProduct(payload)
  res.sendStatus(200)
}

export async function removeFavoriteProductController(req: Request, res: Response): Promise<void> {
  const payload = await removeFavoritePayloadSchema
    .validate(req.body, { stripUnknown: true });
  await removeFavoriteProduct(payload)
  res.sendStatus(200)
}

export async function findFavoriteProductsController(req: Request, res: Response): Promise<void> {
  const payload = favoriteProductsFindPayloadSchema.validateSync(req.params, { stripUnknown: true })
  const products = await findFavoriteProducts(payload);
  res.json(products)
}