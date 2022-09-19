import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import CharacteristicName from "../models/CharacteristicName";
import Characteristic from "../models/Characteristic";
import { characteristicNameSchema } from "../validationSchemas/characteristicName";


export async function getAllCharacteristicNames
  (req: Request, res: Response): Promise<void> {
  const characteristicNames = await CharacteristicName
    .query()
  res.send({ data: { characteristicNames } });
}

export async function getCharacteristicNamesParametrized
  (req: Request, res: Response): Promise<void> {
  const { selectedSubcategoryName, selectedCategoryName } = req.query;
  if (!selectedCategoryName) {
    res.status(400)
      .send({
        error: {
          name: "requestError",
          messages: ["No categories"]
        }
      })
    return
  }
  const characteristicNames = await CharacteristicName
    .query()
    .innerJoin(
      'subcategories',
      'subcategories.id',
      'characteristic_names.for_subcategory_id')
    .innerJoin(
      'categories',
      'categories.id',
      'subcategories.category_id')
    .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
    .skipUndefined()
    .where("categories.name", String(selectedCategoryName))
    .skipUndefined()
    .where("subcategories.name", String(selectedSubcategoryName))
    .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')

  res.send({ data: { characteristicNames } });
}

export async function getCharacteristicNamesBySubcategoryId
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const characteristicNames = await CharacteristicName
    .query()
    .where('for_subcategory_id', id)
    .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
  res.send({ data: { characteristicNames } });
}

export async function getCharacteristicNameById
  (req: Request, res: Response): Promise<void> {
  const characteristicName = await CharacteristicName
    .query()
    .findById(req.params.id)
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
    const subcategory_id = characteristicName.for_subcategory_id;
    const products = await Product
      .query()
      .where("subcategory_id", subcategory_id)
      .orderBy("id", "DESC")

    if (products) {
      const characteristics = products
        .map((product) => {
          return {
            characteristic_name_id: characteristicName.id,
            product_id: product.id,
            value: ""
          }
        })
      await Characteristic
        .query()
        .insertGraph(characteristics as [])
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