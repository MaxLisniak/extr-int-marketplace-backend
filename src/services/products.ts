import {
  productCreatePayloadType,
  productUpdatePayloadType,
  filterPayloadType,
} from "../validationSchemas/product"
import Product from "../models/Product"
import AttributeToProduct from "../models/AttributeToProduct"


export async function findProductsByFilters(payload: filterPayloadType) {

  const {
    attribute_filters,
    offset = 0,
    limit = 10,
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
    query.join("category_to_product", "products.id", "category_to_product.product_id")
      .where("category_id", category_id)
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

  query
    .offset(offset)
    .limit(limit)
  return Promise.all([query, total])
}

export function findProductById(id: number) {
  return Product
    .query()
    .findById(id)
}

export async function createProduct(object: productCreatePayloadType) {
  return Product
    .query()
    .insertAndFetch(object)
}

export function updateProduct(id: number, object: productUpdatePayloadType) {
  return Product
    .query()
    .patchAndFetchById(id, object)
}

export function deleteProduct(id: number) {
  return Product
    .query()
    .deleteById(id)
}
