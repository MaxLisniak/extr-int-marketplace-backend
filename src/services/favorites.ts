import User from "../models/User"
import Favorite from "../models/Favorite"
import { favoriteType } from "../validationSchemas/favorite"

export async function addFavoriteProduct(payload: favoriteType) {
  const { user_id, product_id } = payload
  const favorite = await Favorite
    .query()
    .findOne({ user_id, product_id })
  if (favorite) throw new Error("Can't add to favorite")
  const query = User.relatedQuery("favoriteProducts")
    .for(user_id)
    .relate(product_id)
  return query
}

export async function removeFavoriteProduct(payload: favoriteType) {
  const { user_id, product_id } = payload
  const favorite = await Favorite
    .query()
    .findOne({ user_id, product_id })
  if (!favorite) throw new Error("Can't remove from favorite")
  const query = User.relatedQuery("favoriteProducts")
    .for(user_id)
    .unrelate()
    .where('products.id', product_id)
  return query
}