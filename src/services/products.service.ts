import {
  ProductCreatePayload,
  ProductUpdateByIdPayload,
  ProductFindByFiltersPayload,
  ProductAddAttributePayload,
  ProductRemoveAttributePayload,
} from "../lib/types/products.types"
import Product from "../models/products.model"
import AttributeToProduct from "../models/attribute-to-product.model"
import { CategoriesService } from "./categories.service";
import AttributeName from "../models/attribute-names.model";
import AttributeValue from "../models/attribute-values.model";
import { ref } from "objection";
import { ErrorName } from "../lib/constants";
import CategoryToProduct from "../models/category-to-product.model";
import Brand from "../models/brands.model";


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
  const product = await Product
    .query()
    .findById(id)

  const attributes = await AttributeToProduct
    .query()
    .select('an.name', 'av.value', 'av.id as attribute_id')
    .from(ref(AttributeToProduct.tableName).as('atp'))
    .innerJoin(ref(AttributeValue.tableName).as('av'), 'atp.attribute_value_id', 'av.id')
    .innerJoin(ref(AttributeName.tableName).as('an'), 'av.attribute_name_id', 'an.id')
    .where({
      product_id: product.id
    }) as unknown as {
      name: string,
      value: string,
      attribute_id: number
    }[]

  product.attributes = attributes
  return product
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

async function addAttribute(payload: ProductAddAttributePayload) {
  const {
    name,
    value,
    product_id
  } = payload

  let attributeName = await AttributeName
    .query()
    .findOne({ name })

  if (!attributeName) {
    attributeName = await AttributeName
      .query()
      .insertAndFetch({ name })
  }

  const productAttributeNames = (await AttributeToProduct
    .query()
    .select('an.name')
    .from(ref(AttributeToProduct.tableName).as('atp'))
    .innerJoin(ref(AttributeValue.tableName).as('av'), 'atp.attribute_value_id', 'av.id')
    .innerJoin(ref(AttributeName.tableName).as('an'), 'av.attribute_name_id', 'an.id')
    .where({
      product_id
    }) as Partial<AttributeName & AttributeValue & AttributeToProduct>[])
    .map(obj => obj.name)

  if (productAttributeNames.includes(name)) {
    const error = new Error(`Cannot add attribute, attribute ${name} exists for the specified product`)
    error.name = ErrorName.ValidationError
    throw error
  }

  let attributeValue = await AttributeValue
    .query()
    .findOne({
      attribute_name_id: attributeName.id,
      value
    })

  if (!attributeValue) {
    attributeValue = await AttributeValue
      .query()
      .insertAndFetch({
        attribute_name_id: attributeName.id,
        value
      })
  }

  return await Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .relate(attributeValue.id)

}

async function removeAttribute(payload: ProductRemoveAttributePayload) {
  const {
    attribute_id,
    product_id
  } = payload

  const attributeToProduct = await AttributeToProduct
    .query()
    .findOne({
      attribute_value_id: attribute_id,
      product_id: product_id
    })
  if (!attributeToProduct) {
    const error = new Error(`Cannot remove attribute, it was not added`)
    error.name = ErrorName.ValidationError
    throw error
  }

  return await Product
    .relatedQuery('attribute_values')
    .for(product_id)
    .unrelate()
    .where('attribute_values.id', attribute_id)
}

type Attribute = {
  name: string,
  value: string,
  attribute_id: number
}
async function getFilterList(category_id: number) {
  const attributes = await AttributeToProduct
    .query()
    .distinct('an.name', 'av.value', 'av.id as attribute_id')
    .from(ref(AttributeToProduct.tableName).as('atp'))
    .innerJoin(ref(AttributeValue.tableName).as('av'), 'atp.attribute_value_id', 'av.id')
    .innerJoin(ref(AttributeName.tableName).as('an'), 'av.attribute_name_id', 'an.id')
    .innerJoin(ref(CategoryToProduct.tableName).as('ctp'), (q) => {
      q.on('ctp.product_id', 'atp.product_id')
      q.onVal('ctp.category_id', category_id)
    }) as unknown as Attribute[]

  const pricesFilter = await Product
    .query()
    .min('price as min_price')
    .max('price as max_price')
    .from(ref(Product.tableName).as('p'))
    .innerJoin(ref(CategoryToProduct.tableName).as('ctp'), (q) => {
      q.on('ctp.product_id', 'p.id')
      q.onVal('ctp.category_id', category_id)
    })


  const brandsFilter = await Product
    .query()
    .distinct('brand_id', 'b.name')
    .from(ref(Product.tableName).as('p'))
    .innerJoin(ref(CategoryToProduct.tableName).as('ctp'), (q) => {
      q.on('ctp.product_id', 'p.id')
      q.onVal('ctp.category_id', category_id)
    })
    .innerJoin(ref(Brand.tableName).as('b'), 'p.brand_id', 'b.id')


  const attributesFilter = attributes.reduce((acc, attribute, i) => {
    if (!acc[attribute.name]) {
      acc[attribute.name] = []
    }
    acc[attribute.name].push({
      attribute_value: attribute.value,
      attribute_id: attribute.attribute_id
    })
    return acc
  }, {} as { [index: string]: any })
  return { attributesFilter, brandsFilter, pricesFilter }
}

export const ProductsService = {
  findByFilters,
  findById,
  create,
  updateById,
  deleteById,
  addAttribute,
  removeAttribute,
  getFilterList,
}