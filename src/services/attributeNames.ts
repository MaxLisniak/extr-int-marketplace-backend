import {
  attributeNameCreatePayloadType,
  attributeNameUpdatePayloadType,
} from "../validationSchemas/attributeName"
import AttributeName from "../models/AttributeName"

export function findAttributeNames() {
  const query = AttributeName.query()
  // if (params.category_id) {
  //   query.where('category_id', params.category_id)
  // }
  // query.withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  return query
}

export function findAttributeNameById(id: number) {
  const query = AttributeName
    .query()
    .findById(id)
  // query.withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  return query
}

export async function createAttributeName(object: attributeNameCreatePayloadType) {
  const query = AttributeName
    .query()
    .insertAndFetch(object)

  // const attributeName = await query;

  // const category_id = attributeName.category_id;
  // const products = await Product
  //   .query()
  //   .where("category_id", category_id)

  // const characteristicValues = products
  //   .map((product) => {
  //     return {
  //       characteristic_name_id: attributeName.id,
  //       product_id: product.id,
  //       value: ""
  //     }
  //   })
  // await CharacteristicValue
  //   .query()
  //   .insertGraph(characteristicValues)
  return query
}

export function updateAttributeName(id: number, object: attributeNameUpdatePayloadType) {
  const query = AttributeName
    .query()
    .patchAndFetchById(id, object)
  return query
}

export function deleteAttributeName(id: number) {
  const query = AttributeName
    .query()
    .deleteById(id)
  return query
}