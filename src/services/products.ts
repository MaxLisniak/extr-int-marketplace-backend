import {
  productFindPayloadType,
  productCreatePayloadType,
  productUpdatePayloadType,
  filterPayloadType,
} from "../validationSchemas/product"
import Product from "../models/Product"
import ProductToAttribute from "../models/ProductToAttribute"

const PRODUCTS_PER_PAGE = 4

export async function findProducts(params: productFindPayloadType) {
  const query = Product.query()
  // // fetch products that belong to a particular category if it's a tree leaf
  // if (params.category_id) {
  //   const childrenCategories = await Category
  //     .query()
  //     .where('parent_id', params.category_id);
  //   console.log(childrenCategories)
  //   if (childrenCategories.length === 0) {
  //     query.where('category_id', params.category_id)
  //   } else throw new Error("The specified category cannot be used for selecting products")
  // }
  // limit products to those which name is like specified

  if (params.search_query) {
    query.where('name', 'like', `%${params.search_query}%`)
  }

  query.limit(PRODUCTS_PER_PAGE)

  if (params.page) {
    query.offset((params.page - 1) * PRODUCTS_PER_PAGE)
  }

  query
    .orderBy('id', "DESC")
    .withGraphFetched('attribute_values.[attribute_name]')

  return query
}

export async function findProductsByFilters(payload: filterPayloadType) {

  const { attribute_filters, page, category_id, brands, price } = payload;

  const query = Product.query();

  if (attribute_filters) {
    query.whereIn('products.id', ProductToAttribute
      .query()
      .distinct("product_id")
      .alias('pa')
      .whereRaw(
        attribute_filters.map(filterValues => {
          return `exists(select 1 from product_to_attribute where (${filterValues.map(id => `attribute_value_id=${id}`)
            .join(' or ')
            }) and product_id = pa.product_id)`
        }).join(' and ')
      )
    );
  }

  if (category_id) {
    query.join("product_to_category", "products.id", "product_to_category.product_id")
      .where("category_id", category_id)
  }

  if (brands) {
    query.whereIn("brand_id", brands)
  }

  if (price.min && price.max) {
    query.whereBetween("price", [price.min, price.max])
  }

  if (page) { // TODO: вместо страницы используй offset and limit - например, если на фронте будут страницы с разным количеством продуктов
    query.offset((page - 1) * PRODUCTS_PER_PAGE)
  }

  query.limit(PRODUCTS_PER_PAGE)

  console.log(query.toKnexQuery().toSQL())
  return query // TODO: верни еще и общее количество продуктов для паджинации
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
