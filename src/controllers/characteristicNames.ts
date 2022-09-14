import { RequestHandler } from "express";
import Product from "../models/Product";
import CharacteristicName from "../models/CharacteristicName";
import { CharacteristicName as CharacteristicNameType } from "../types";
import { Characteristic as CharacteristicType } from "../types";
import Characteristic from "../models/Characteristic";
import { Product as ProductType } from '../types';


export const getAllCharacteristicNames: RequestHandler =
  async (req, res) => {
    try {
      const characteristic_names = await CharacteristicName
        .query()
      return res.send(characteristic_names);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getCharacteristicNamesParametrized: RequestHandler =
  async (req, res) => {
    try {
      const { selectedSubcategoryName, selectedCategoryName } = req.query;
      if (!selectedCategoryName) return res.send("no categories")
      const characteristic_names = await CharacteristicName
        .query()
        .innerJoin('subcategories', 'subcategories.id', 'characteristic_names.for_subcategory_id')
        .innerJoin('categories', 'categories.id', 'subcategories.category_id')
        .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
        .skipUndefined()
        .where("categories.name", String(selectedCategoryName))
        .skipUndefined()
        .where("subcategories.name", String(selectedSubcategoryName))
        .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
      return res.send(characteristic_names);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getCharacteristicNamesBySubcategoryId: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id;
      const characteristic_names = await CharacteristicName
        .query()
        .where('for_subcategory_id', id)
        .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
      return res.send(characteristic_names);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const getCharacteristicNameById: RequestHandler =
  async (req, res) => {
    try {
      const characteristic_name = await CharacteristicName
        .query()
        .findById(req.params.id);
      return res.send(characteristic_name);
    } catch (err) {
      console.log(err);
      // Internal Server Error
      return res.sendStatus(500);
    }
  }

export const postCharacteristicName: RequestHandler =
  async (req, res) => {
    try {
      const characteristic_name = await CharacteristicName.query()
        .insertAndFetch(req.body);
      if (characteristic_name) {
        const subcategory_id = characteristic_name.for_subcategory_id;
        const products = await Product.query()
          .where("subcategory_id", subcategory_id)
          .orderBy("id", "DESC");
        const characteristics = products
          .map((product) => {
            return {
              characteristic_name_id: characteristic_name.id,
              product_id: product.id,
              value: ""
            }
          })
        await Characteristic.query()
          .insertGraph(characteristics as []);
        return res.send(characteristic_name);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const patchCharacteristicName: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await CharacteristicName.query()
        .findById(id)
        .patch(req.body);
      if (queryResult) {
        const newObject = await CharacteristicName.query()
          .findById(id);
        return res.send(newObject);
      }
      else res.sendStatus(400)
    } catch (err) {
      console.log(err);
      return res.sendStatus(400)
    }
  }

export const deleteCharacteristicName: RequestHandler =
  async (req, res) => {
    try {
      const id = req.params.id
      const queryResult = await CharacteristicName.query()
        .deleteById(id)
      if (queryResult)
        return res.sendStatus(200);
      else
        return res.sendStatus(400);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }