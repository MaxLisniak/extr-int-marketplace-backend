import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import CharacteristicName from "../models/CharacteristicName";
import Characteristic from "../models/Characteristic";
import { productSchema } from "../validationSchemas/product";

export async function getAllProducts
  (req: Request, res: Response): Promise<void> {
  const products = await Product
    .query()
    .orderBy('id', "DESC")

  res.send({ data: { products } });
}

export async function getProductsByQuery
  (req: Request, res: Response): Promise<void> {
  const { q } = req.query;
  const products = await Product
    .query()
    .where('name', 'like', `%${q}%`)

  res.send({ data: { products } });
}

export async function getProductsParametrized
  (req: Request, res: Response): Promise<void> {
  const {
    selectedCategoryName,
    selectedSubcategoryName,
  } = req.query;

  if (!selectedCategoryName || !selectedSubcategoryName) {
    res.sendStatus(400);
  }

  const products = await
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

  res.send({ data: { products } });
}

export async function getProductById
  (req: Request, res: Response): Promise<void> {
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

  res.send({ data: { product } });
}

export async function postProduct
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  productSchema.validate(req.body)
    .catch(err => next(err))
  const product = await Product
    .query()
    .insertAndFetch(req.body)

  if (product) {
    const subcategoryId = product.subcategory_id;
    const characteristicNames = await CharacteristicName
      .query()
      .where("for_subcategory_id", subcategoryId)
      .orderBy("id", "DESC")

    if (characteristicNames) {
      const characteristics = characteristicNames
        .map((characteristicName) => {
          return {
            characteristic_name_id: characteristicName.id,
            product_id: product.id,
            value: ""
          }
        })
      await Characteristic
        .query()
        .insertGraph(characteristics as [])

      res.send({ data: { product } });
    } else res.sendStatus(400)
  }
  else res.sendStatus(400)
}

export async function patchProduct
  (req: Request, res: Response, next: NextFunction): Promise<void> {
  productSchema.validate(req.body)
    .catch(err => next(err))
  const id = req.params.id
  const product = await Product
    .query()
    .patchAndFetchById(id, req.body)

  res.send({ data: { product } })
}

export async function deleteProduct
  (req: Request, res: Response): Promise<void> {
  const id = req.params.id
  const queryResult = await Product
    .query()
    .deleteById(id)

  res.sendStatus(200);
}
