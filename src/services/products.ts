import {
  productFindPayloadType,
  productCreatePayloadType,
  productUpdatePayloadType,
  attributeToProductPayloadType,
  filterPayloadType
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
  const existsExpressions = filtersValues.map(filterValues => {
    return `exists(select 1 from product_to_attribute where (${filterValues.map(value => 'attribute_value_id=??').join(' or ')}) and product_id = pa.product_id)\n`
  })

  let sql =
    `
    select * from products
    where 
      id in (
        select distinct product_id from product_to_attribute as pa
        where 
        ${existsExpressions.join(' and ')}
        )
    limit ?
    `
  const knex = Product.knex();
  let queryParams = [].concat.apply([], filtersValues)
  queryParams.push(PRODUCTS_PER_PAGE)
  if (params.page) {
    sql += `offset ?`
    queryParams.push((params.page - 1) * PRODUCTS_PER_PAGE)
  }

  const query = knex.raw(sql, queryParams)
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

export async function addAttributeToProduct(payload: attributeToProductPayloadType) {
  const { attribute_value_id, product_id } = payload
  const pair = await ProductToAttribute
    .query()
    .findOne({ attribute_value_id, product_id })
  if (pair) throw new Error("Can't add attribute, it's already included")
  const query = Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .relate(attribute_value_id)
  return query
}

export async function removeAttributeToProduct(payload: attributeToProductPayloadType) {
  const { attribute_value_id, product_id } = payload
  const pair = await ProductToAttribute
    .query()
    .findOne({ attribute_value_id, product_id })
  if (!pair) throw new Error("Can't remove attribute, it's not included")
  const query = Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .unrelate()
    .where('attribute_values.id', attribute_value_id)
  return query
}