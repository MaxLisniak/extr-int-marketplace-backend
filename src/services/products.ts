import {
  productFindPayloadType,
  productCreatePayloadType,
  productUpdatePayloadType,
  filterPayloadType,
} from "../validationSchemas/product"
import Product from "../models/Product"
import Category from "../models/Categoty"
import ProductToAttribute from "../models/ProductToAttribute"

const PRODUCTS_PER_PAGE = 2

export async function findProducts(params: productFindPayloadType) {
  const query = Product.query()
  // fetch products that belong to a particular category if it's a tree leaf
  if (params.category_id) {
    const childrenCategories = await Category
      .query()
      .where('parent_id', params.category_id);
    console.log(childrenCategories)
    if (childrenCategories.length === 0) {
      query.where('category_id', params.category_id)
    } else throw new Error("The specified category cannot be used for selecting products")
  }
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

export async function findProductsByFilters(filtersValues: filterPayloadType[], params: productFindPayloadType) {
  const query = Product
    .query()
    .whereIn('id', ProductToAttribute
      .query()
      .distinct("product_id")
      .alias('pa')
      .whereRaw(
        filtersValues.map(filterValues => {
          return `exists(select 1 from product_to_attribute where (${filterValues.map(id => `attribute_value_id=${id}`)
            .join(' or ')
            }) and product_id = pa.product_id)`
        }).join(' and ')
      )
    )
    .limit(PRODUCTS_PER_PAGE)

  if (params.page) {
    query.offset((params.page - 1) * PRODUCTS_PER_PAGE)
  }
  console.log(query.toKnexQuery().toSQL())
  return query
}

export function findProductById(id: number) {
  const query = Product
    .query()
    .findById(id)
  return query
}

export async function createProduct(object: productCreatePayloadType) {
  const query = Product
    .query()
    .insertAndFetch(object)
  return query
}

export function updateProduct(id: number, object: productUpdatePayloadType) {
  const query = Product
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteProduct(id: number) {
  const query = Product
    .query()
    .deleteById(id)
  return query
}
