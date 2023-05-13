import * as yup from 'yup';
import { FavoritesValidationSchemas } from "../../validation-schemas/favorites.validation"

export type RemoveFavoritePayload = yup.InferType<typeof FavoritesValidationSchemas.removeFavoritePayload>
export type AddFavoritePayload = yup.InferType<typeof FavoritesValidationSchemas.addFavoritePayload>
export type FavoriteProductsFindPayload = yup.InferType<typeof FavoritesValidationSchemas.favoriteProductsFindPayload>