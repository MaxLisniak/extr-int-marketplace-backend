import {
  ProductCreatePayload,
  ProductUpdateByIdPayload,
  ProductFindByFiltersPayload,
} from "../lib/types/products.types"
import Product from "../models/products.model"
import AttributeToProduct from "../models/attribute-to-product.model"
import { CategoriesService } from "./categories.service";


async function findByFilters(payload: ProductFindByFiltersPayload) {

  const {
    attribute_filters,
    offset,
    limit,
    category_id,
    brands,
    price
  } = payload;

  const query = Product.query()

  if (attribute_filters) {
    query.whereIn('products.id', AttributeToProduct
      .query()
      .distinct("product_id")
      .alias('pa')
      .whereRaw(
        attribute_filters.map(filterValues => {
          return `exists(select 1 from attribute_to_product where (${filterValues.map(id => `attribute_value_id=${id}`)
            .join(' or ')
            }) and product_id = pa.product_id)`
        }).join(' and ')
      )
    );
  }

  if (category_id) {
    const childrenCategories = await CategoriesService.getChildrenCategories(category_id)
    query.join("category_to_product", "products.id", "category_to_product.product_id")
      .whereIn("category_id", [category_id, ...childrenCategories.map(child => child.id)])
  }

  if (brands) {
    query.whereIn("brand_id", brands)
  }

  if (price.min) {
    query.where('price', ">=", price.min)
  }

  if (price.max) {
    query.where('price', "<=", price.max)
  }

  const total = query
    .clone()
    .count("products.id as total")

  query.limit(limit)

  if (offset) {
    query.offset(offset)
  }
  return await Promise.all([query, total])
}

async function findById(id: number) {
  return await Product
    .query()
    .findById(id)
}

async function create(object: ProductCreatePayload) {
  return await Product
    .query()
    .insertAndFetch(object)
}

async function updateById(id: number, object: ProductUpdateByIdPayload) {
  return await Product
    .query()
    .patchAndFetchById(id, object)
}

async function deleteById(id: number) {
  return await Product
    .query()
    .deleteById(id)
}

export const ProductsService = {
  findByFilters,
  findById,
  create,
  updateById,
  deleteById,
}