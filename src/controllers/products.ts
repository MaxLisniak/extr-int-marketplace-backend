import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import CharacteristicName from "../models/CharacteristicName";
import CharacteristicValue from "../models/CharacteristicValue";
import { productSchema } from "../validationSchemas/product";

export async function getAllProducts
  (req: Request, res: Response): Promise<void> {
  const {
    category_id,
    search_query,
    include_comments,
    include_characteristics
  } = req.query;

  let query = Product
    .query()

  if (category_id) {
    query = query
      .where('category_id', Number(category_id))
  }

  if (search_query) {
    query = query
      .where('name', 'like', `%${search_query}%`)
  }

  if (include_comments === "true") {
    query = query
      .withGraphFetched("comments.[user]")
  }

  if (include_characteristics === "true") {
    query = query
      .withGraphFetched("characteristic_values.[characteristic_name]")
  }

  query = query
    .orderBy('id', "DESC")

  const products = await query
  res.send({ data: { products } });
}

// export async function getProductsByQuery
//   (req: Request, res: Response): Promise<void> {
//   const { q } = req.query;
//   const products = await Product
//     .query()
//     .where('name', 'like', `%${q}%`)

//   res.send({ data: { products } });
// }

// export async function getProductsParametrized
//   (req: Request, res: Response): Promise<void> {
//   const {
//     selectedCategoryName,
//     selectedSubcategoryName,
//   } = req.query;

//   if (!selectedCategoryName || !selectedSubcategoryName) {
//     res.sendStatus(400);
//   }

//   const products = await
//     Product
//       .query()
//       .select(
//         ['products.id', 'products.name', 'products.image_url'],
//         Product.relatedQuery('favorites')
//           .count()
//           .as("number_of_favorites"),
//         Product.relatedQuery('prices')
//           .select('price')
//           .orderBy('date', 'desc')
//           .limit(1)
//           .as('latest_price'),
//       )
//       .withGraphFetched(
//         "[characteristics(defaultSelects).[characteristic_name], subcategory]"
//       )
//       .innerJoin(
//         'subcategories',
//         'products.subcategory_id',
//         'subcategories.id'
//       )
//       .innerJoin(
//         'categories',
//         'subcategories.category_id',
//         'categories.id'
//       )
//       .where("categories.name", String(selectedCategoryName))
//       .where("subcategories.name", String(selectedSubcategoryName))

//   res.send({ data: { products } });
// }

export async function getProductById
  (req: Request, res: Response): Promise<void> {
  const {
    include_comments,
    include_characteristics
  } = req.query;

  let query = Product
    .query()
    .findById(req.params.id)

  if (include_comments === "true") {
    query = query
      .withGraphFetched("comments.[user]")
  }

  if (include_characteristics === "true") {
    query = query
      .withGraphFetched("characteristic_values.[characteristic_name]")
  }

  const product = await query
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
    const categoryId = product.category_id;
    const characteristicNames = await CharacteristicName
      .query()
      .where("category_id", categoryId)
      .orderBy("id", "DESC")

    if (characteristicNames) {
      const characteristicValues = characteristicNames
        .map((characteristicName) => {
          return {
            characteristic_name_id: characteristicName.id,
            product_id: product.id,
            value: ""
          }
        })
      await CharacteristicValue
        .query()
        .insertGraph(characteristicValues as [])

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
