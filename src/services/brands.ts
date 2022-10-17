import {
  brandCreatePayloadType,
  brandUpdatePayloadType
} from "../validationSchemas/brand";
import Brand from "../models/Brand";

export function findBrands() {
  const query = Brand.query()
  return query
}

export function findBrandById(id: number) {
  const query = Brand
    .query()
    .findById(id)
  return query
}

export function createBrand(object: brandCreatePayloadType) {
  const query = Brand
    .query()
    .insertAndFetch(object)
  return query
}

export function updateBrand(id: number, object: brandUpdatePayloadType) {
  const query = Brand
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteBrand(id: number) {
  const query = Brand
    .query()
    .deleteById(id)
  return query
}