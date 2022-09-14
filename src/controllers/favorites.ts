import { RequestHandler } from "express";
import Favorite from "../models/Favorite";

export const getAllFavorites: RequestHandler =
  async (req, res) => {
    const favorites = await Favorite.query()
    return res.send(favorites);
  }

export const toggleFavorite: RequestHandler =
  async (req, res) => {
    const { product_id, user_id } = req.body;
    const fav = await Favorite.query()
      .findOne({ product_id, user_id });
    if (!fav) {
      await Favorite.query()
        .insert({
          product_id,
          user_id
        })
    } else {
      await Favorite.query()
        .deleteById(fav.id);
    }
    return res.sendStatus(200);
  }

export const getFavoritesForUser: RequestHandler =
  async (req, res) => {
    const { user_id } = req.query;
    const favorites = await Favorite.query()
      .withGraphFetched("product")
      .where({ user_id: user_id })
    const products = favorites.map((fav) => fav.product);
    return res.send(products);
  }

export const getFavoriteById: RequestHandler =
  async (req, res) => {
    const favorite = await Favorite
      .query()
      .findById(req.params.id)
    return res.send(favorite);
  }

export const postFavorite: RequestHandler =
  async (req, res) => {
    const queryResult = await Favorite.query()
      .insert(req.body);
    if (queryResult) {
      return res.send(queryResult);
    }
    else res.sendStatus(400)
  }

export const patchFavorite: RequestHandler =
  async (req, res,) => {
    const id = req.params.id
    const queryResult = await Favorite.query()
      .findById(id)
      .patch(req.body);
    if (queryResult) {
      const newObject = await Favorite.query()
        .findById(id);
      return res.send(newObject);
    }
    else res.sendStatus(400)
  }

export const deleteFavorite: RequestHandler =
  async (req, res) => {
    const id = req.params.id
    const queryResult = await Favorite.query()
      .deleteById(id)
    if (queryResult)
      return res.sendStatus(200);
    else
      return res.sendStatus(400);
  }