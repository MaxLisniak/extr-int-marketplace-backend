import { RequestHandler } from "express";
import { favoriteSchema } from "../validationSchemas/favorite";
import Favorite from "../models/Favorite";

export const getAllFavorites: RequestHandler =
  async (req, res, next) => {
    const favorites = await Favorite
      .query()

    return res.send(favorites);
  }

export const toggleFavorite: RequestHandler =
  async (req, res, next) => {
    const { product_id, user_id } = req.body;
    const fav = await Favorite
      .query()
      .findOne({ product_id, user_id })

    if (!fav) {
      await Favorite.query()
        .insert({
          product_id,
          user_id
        })

    } else {
      await Favorite
        .query()
        .deleteById(fav.id)

    }
    return res.sendStatus(200);
  }

export const getFavoritesForUser: RequestHandler =
  async (req, res, next) => {
    const { user_id } = req.query;
    const favorites = await Favorite
      .query()
      .withGraphFetched("product")
      .where({ user_id: user_id })

    if (favorites) {
      const products = favorites.map((fav) => fav.product);
      return res.send(products);
    }
  }

export const getFavoriteById: RequestHandler =
  async (req, res, next) => {
    const favorite = await Favorite
      .query()
      .findById(req.params.id)

    return res.send(favorite);
  }

export const postFavorite: RequestHandler =
  async (req, res, next) => {
    favoriteSchema.validate(req.body)
      .catch(err => next(err))
    const favorite = await Favorite
      .query()
      .insertAndFetch(req.body)

    return res.send(favorite)
  }

export const patchFavorite: RequestHandler =
  async (req, res, next) => {
    favoriteSchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const favorite = await Favorite
      .query()
      .patchAndFetchById(id, req.body)

    return res.send(favorite)
  }

export const deleteFavorite: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Favorite
      .query()
      .deleteById(id)

    return res.sendStatus(200);
  }