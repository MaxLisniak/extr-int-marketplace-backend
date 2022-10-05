import AttributeName from "../models/AttributeName"
import {
  productFindPayloadType,
  productCreatePayloadType,
  productUpdatePayloadType
} from "../validationSchemas/product"
import Product from "../models/Product"
import AttributeValue from "../models/AttributeValue"
import Category from "../models/Categoty"
const PRODUCTS_PER_PAGE = 1

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

  // query.limit(PRODUCTS_PER_PAGE)
  // if (params.page) {
  //   query.offset((params.page - 1) * PRODUCTS_PER_PAGE)
  // }
  query
    .orderBy('id', "DESC")
    .withGraphFetched('attribute_values.[attribute_name]')
  console.log(await findProductsByFilters())
  return query
}

export async function findProductsByFilters() {
  const filters = {
    "Color": ["Starlight", "PRODUCT(RED)"],
    "Storage": ["128GB"],
    "Display size": ["6in"],
  }
  let innerQuery;
  let query;
  let first = true
  for (const filter of Object.entries(filters)) {
    query = Product.query()
      .select('products.id')
      .innerJoin('attribute_pairs', 'attribute_pairs.product_id', 'products.id')
      .innerJoin('attribute_names', 'attribute_pairs.attribute_name_id', 'attribute_names.id')
      .innerJoin('attribute_values', 'attribute_pairs.attribute_value_id', 'attribute_values.id')
      .where(
        q => {
          q.where('attribute_names.name', filter[0])
            .andWhere(w => {
              for (const value of filter[1]) {
                w.orWhere('attribute_values.value', value)
              }
            })
        }
      )
    if (first) {
      first = false;
      innerQuery = query
      continue;
    }
    query = query.whereIn('products.id', innerQuery)
    innerQuery = query
  }
  query.select('products.id', 'products.name')
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

  // const product = await query

  // const categoryId = product.category_id;
  // const attributeNames = await AttributeName
  //   .query()
  //   .where("category_id", categoryId)
  //   .orderBy("id", "DESC")

  // const attributeValues = attributeNames
  //   .map((attributeName) => {
  //     return {
  //       characteristic_name_id: attributeName.id,
  //       product_id: product.id,
  //       value: ""
  //     }
  //   })
  // await AttributeValue
  //   .query()
  //   .insertGraph(attributeValues)
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
