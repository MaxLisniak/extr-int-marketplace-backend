import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import CharacteristicName from "../models/CharacteristicName";
import Characteristic from "../models/CharacteristicValue";
import { characteristicNameSchema } from "../validationSchemas/characteristicName";


export async function getAllCharacteristicNames
  (req: Request, res: Response): Promise<void> {
  const { category_id, include_characteristic_values } = req.query;
  let query

  query = CharacteristicName
    .query()

  if (category_id) {
    query = query
      .where('category_id', Number(category_id))
  }
  if (include_characteristic_values === "true") {
    query = query
      .withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  }

  const characteristicNames = await query
  res.send({ data: { characteristicNames } });
}

// export async function getCharacteristicNamesParametrized
//   (req: Request, res: Response): Promise<void> {
//   const { selectedSubcategoryName, selectedCategoryName } = req.query;
//   if (!selectedCategoryName) {
//     res.status(400)
//       .send({
//         error: {
//           name: "requestError",
//           messages: ["No categories"]
//         }
//       })
//     return
//   }
//   const characteristicNames = await CharacteristicName
//     .query()
//     .innerJoin(
//       'subcategories',
//       'subcategories.id',
//       'characteristic_names.for_subcategory_id')
//     .innerJoin(
//       'categories',
//       'categories.id',
//       'subcategories.category_id')
//     .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
//     .skipUndefined()
//     .where("categories.name", String(selectedCategoryName))
//     .skipUndefined()
//     .where("subcategories.name", String(selectedSubcategoryName))
//     .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')

//   res.send({ data: { characteristicNames } });
// }

// export async function getCharacteristicsByCategoryId
//   (req: Request, res: Response): Promise<void> {
//   const id = req.params.id;
//   const characteristics = await CharacteristicName
//     .query()
//     .where('category_id', id)
//     .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
//   res.send({ data: { characteristics } });
// }

export async function getCharacteristicNameById
  (req: Request, res: Response): Promise<void> {
  const { include_characteristic_values } = req.query;
  let query

  query = CharacteristicName
    .query()
    .findById(req.params.id)

  if (include_characteristic_values === "true") {
    query = query
      .withGraphFetched('characteristic_values(onlyUniqueValues, defaultSelects)')
  }

  const characteristicName = await query
  res.send({ data: { characteristicName } });
}

export async function postCharacteristicName
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  characteristicNameSchema.validate(req.body)
    .catch(err => next(err))
  const characteristicName = await CharacteristicName
    .query()
    .insertAndFetch(req.body)
  if (characteristicName) {
    const category_id = characteristicName.category_id;
    const products = await Product
      .query()
      .where("category_id", category_id)
      .orderBy("id", "DESC")

    if (products) {
      const characteristicValues = products
        .map((product) => {
          return {
            characteristic_name_id: characteristicName.id,
            product_id: product.id,
            value: ""
          }
        })
      await Characteristic
        .query()
        .insertGraph(characteristicValues as [])
      res.send({ data: { characteristicName } });
    }
  }
}

export async function patchCharacteristicName
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  characteristicNameSchema.validate(req.body)
    .catch(err => next(err))
  const id = req.params.id
  const characteristicName = await CharacteristicName
    .query()
    .patchAndFetchById(id, req.body)
  res.send({ data: { characteristicName } });
}

export async function deleteCharacteristicName
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const queryResult = await CharacteristicName
    .query()
    .deleteById(id)
  res.sendStatus(200);
}