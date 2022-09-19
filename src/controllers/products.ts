import { RequestHandler } from "express";
import Product from "../models/Product";
import CharacteristicName from "../models/CharacteristicName";
import Characteristic from "../models/Characteristic";
import { productSchema } from "../validationSchemas/product";

export const getAllProducts: RequestHandler =
  async (req, res, next) => {
    const products = await Product
      .query()
      .orderBy('id', "DESC")

    return res.send(products);
  }

export const getProductsByQuery: RequestHandler =
  async (req, res, next) => {
    const { q } = req.query;
    const products = await Product
      .query()
      .where('name', 'like', `%${q}%`)

    return res.send(products);
  }

export const getProductsParametrized: RequestHandler =
  async (req, res, next) => {
    const {
      selectedCategoryName,
      selectedSubcategoryName,
    } = req.query;

    if (!selectedCategoryName || !selectedSubcategoryName) {
      return res.sendStatus(400);
    }

    const allProducts = await
      Product
        .query()
        .select(
          ['products.id', 'products.name', 'products.image_url'],
          Product.relatedQuery('favorites')
            .count()
            .as("number_of_favorites"),
          Product.relatedQuery('prices')
            .select('price')
            .orderBy('date', 'desc')
            .limit(1)
            .as('latest_price'),
        )
        .withGraphFetched(
          "[characteristics(defaultSelects).[characteristic_name], subcategory]"
        )
        .innerJoin(
          'subcategories',
          'products.subcategory_id',
          'subcategories.id'
        )
        .innerJoin(
          'categories',
          'subcategories.category_id',
          'categories.id'
        )
        .where("categories.name", String(selectedCategoryName))
        .where("subcategories.name", String(selectedSubcategoryName))

    return res.send(allProducts);
  }

export const getProductById: RequestHandler =
  async (req, res, next) => {
    const product = await Product
      .query()
      .findById(req.params.id)
      .select(
        'products.*',
        Product.relatedQuery('favorites')
          .count()
          .as("number_of_favorites"),
        Product.relatedQuery('prices')
          .select('price')
          .orderBy('date', 'desc')
          .limit(1)
          .as('latest_price'),
      )
      .withGraphFetched(
        "[subcategory.[category], comments.[user], prices, characteristics.[characteristic_name]]")

    return res.send(product);
  }

export const postProduct: RequestHandler =
  async (req, res, next) => {
    productSchema.validate(req.body)
      .catch(err => next(err))
    const product = await Product
      .query()
      .insertAndFetch(req.body)

    if (product) {
      const subcategory_id = product.subcategory_id;
      const characteristic_names = await CharacteristicName
        .query()
        .where("for_subcategory_id", subcategory_id)
        .orderBy("id", "DESC")

      if (characteristic_names) {
        const characteristics = characteristic_names
          .map((characteristic_name) => {
            return {
              characteristic_name_id: characteristic_name.id,
              product_id: product.id,
              value: ""
            }
          })
        await Characteristic
          .query()
          .insertGraph(characteristics as [])

        return res.send(product);
      } else res.sendStatus(400)
    }
    else res.sendStatus(400)
  }

export const patchProduct: RequestHandler =
  async (req, res, next) => {
    productSchema.validate(req.body)
      .catch(err => next(err))
    const id = req.params.id
    const product = await Product
      .query()
      .patchAndFetchById(id, req.body)

    return res.send(product)
  }

export const deleteProduct: RequestHandler =
  async (req, res, next) => {
    const id = req.params.id
    const queryResult = await Product
      .query()
      .deleteById(id)

    return res.sendStatus(200);
  }
