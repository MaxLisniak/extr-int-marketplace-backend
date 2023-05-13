import { Request, Response } from "express";
import { FavoritesService } from "../services/favorites.service";
import { FavoritesValidationSchemas } from "../validation-schemas/favorites.validation";

async function addFavoriteProduct(req: Request, res: Response): Promise<void> {
  const payload = await FavoritesValidationSchemas.addFavoritePayload
    .validate(req.body, { stripUnknown: true })
  await FavoritesService.addFavoriteProduct(payload)
  res.sendStatus(200)
}

async function removeFavoriteProduct(req: Request, res: Response): Promise<void> {
  const payload = await FavoritesValidationSchemas.removeFavoritePayload
    .validate(req.body, { stripUnknown: true });
  await FavoritesService.removeFavoriteProduct(payload)
  res.sendStatus(200)
}

async function findFavoriteProducts(req: Request, res: Response): Promise<void> {
  const payload = await FavoritesValidationSchemas.favoriteProductsFindPayload
    .validate(req.params, { stripUnknown: true })
  const products = await FavoritesService.findFavoriteProducts(payload);
  res.json(products)
}

export const FavoritesController = {
  addFavoriteProduct,
  removeFavoriteProduct,
  findFavoriteProducts,
}