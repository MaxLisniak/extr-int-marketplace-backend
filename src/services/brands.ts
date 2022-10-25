import {
  brandCreatePayloadType,
  brandUpdatePayloadType
} from "../validationSchemas/brand";
import Brand from "../models/Brand";

export function findBrands() {
  return Brand.query() // TODO: должна быть паджинация
}

export function findBrandById(id: number) {
  return Brand
    .query()
    .findById(id)
}

export function createBrand(object: brandCreatePayloadType) {
  return Brand
    .query()
    .insertAndFetch(object)
}

export function updateBrand(id: number, object: brandUpdatePayloadType) {
  return Brand
    .query()
    .patchAndFetchById(id, object)
}

export function deleteBrand(id: number) {
  return Brand
    .query()
    .deleteById(id)
}