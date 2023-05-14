
import { BrandCreatePayload, BrandFindPayload, BrandUpdateByIdPayload } from "../lib/types/brands.types";
import Brand from "../models/brands.model";

async function find(params: BrandFindPayload) {
  const { limit = 10, offset = 0 } = params;
  return await Brand
    .query()
    .offset(offset)
    .limit(limit)
    .orderBy('name', 'DESC');
}

async function findById(id: number) {
  return await Brand
    .query()
    .findById(id)
}

async function create(object: BrandCreatePayload) {
  return await Brand
    .query()
    .insertAndFetch(object)
}

async function updateById(id: number, object: BrandUpdateByIdPayload) {
  return await Brand
    .query()
    .patchAndFetchById(id, object)
}

async function deleteById(id: number) {
  return await Brand
    .query()
    .deleteById(id)
}

export const BrandsService = {
  find,
  findById,
  create,
  updateById,
  deleteById,
}