
import { BrandCreatePayload, BrandFindPayload, BrandUpdatePayload } from "../lib/types/brands.types";
import Brand from "../models/Brand";

async function findBrands(params: BrandFindPayload) {
  const { limit = 10, offset = 0 } = params;
  return await Brand
    .query()
    .offset(offset)
    .limit(limit)
    .orderBy('name', 'DESC');
}

async function findBrandById(id: number) {
  return await Brand
    .query()
    .findById(id)
}

async function createBrand(object: BrandCreatePayload) {
  return await Brand
    .query()
    .insertAndFetch(object)
}

async function updateBrand(id: number, object: BrandUpdatePayload) {
  return await Brand
    .query()
    .patchAndFetchById(id, object)
}

async function deleteBrand(id: number) {
  return await Brand
    .query()
    .deleteById(id)
}

export const BrandsService = {
  findBrands,
  findBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
}