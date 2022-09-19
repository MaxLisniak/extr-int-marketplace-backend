import { RequestHandler } from "express";
import Product from "../models/Product";
import CharacteristicName from "../models/CharacteristicName";
import Characteristic from "../models/Characteristic";
import { characteristicNameSchema } from "../validationSchemas/characteristicName";


export const getAllCharacteristicNames: RequestHandler =
  async (req, res, next) => {
    const characteristic_names = await CharacteristicName
      .query()

    return res.send(characteristic_names);
  }

export const getCharacteristicNamesParametrized: RequestHandler =
  async (req, res, next) => {
    const { selectedSubcategoryName, selectedCategoryName } = req.query;
    if (!selectedCategoryName) return res.status(400).send("no categories")
    const characteristic_names = await CharacteristicName
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

    return res.send(characteristic_names);
  }

export const getCharacteristicNamesBySubcategoryId: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id;
    const characteristic_names = await CharacteristicName
      .query()
      .where('for_subcategory_id', id)
      .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')

    return res.send(characteristic_names);
  }

export const getCharacteristicNameById: RequestHandler =
  async (req, res, next) => {
    const characteristic_name = await CharacteristicName
      .query()
      .findById(req.params.id)

    return res.send(characteristic_name);
  }

export const postCharacteristicName: RequestHandler =
  async (req, res, next) => {
    characteristicNameSchema.validate(req.body)
      .catch(err => next(err))
    const characteristic_name = await CharacteristicName
      .query()
      .insertAndFetch(req.body)

    if (characteristic_name) {
      const subcategory_id = characteristic_name.for_subcategory_id;
      const products = await Product
        .query()
        .where("subcategory_id", subcategory_id)
        .orderBy("id", "DESC")

      if (products) {
        const characteristics = products
          .map((product) => {
            return {
              characteristic_name_id: characteristic_name.id,
              product_id: product.id,
              value: ""
            }
          })
        await Characteristic
          .query()
          .insertGraph(characteristics as [])

        return res.send(characteristic_name);
      }
    }
  }

export const patchCharacteristicName: RequestHandler =
  async (req, res, next) => {
    characteristicNameSchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const characteristicName = await CharacteristicName
      .query()
      .patchAndFetchById(id, req.body)

    return res.send(characteristicName);
  }

export const deleteCharacteristicName: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await CharacteristicName
      .query()
      .deleteById(id)

    return res.sendStatus(200);
  }