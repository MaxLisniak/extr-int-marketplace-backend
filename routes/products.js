var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
const Category = require('../models/Categoty');
const Product = require('../models/Product');
const Subcategory = require('../models/Subcategory');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product
      .query()
      .select(
        'products.*',
        Product.relatedQuery('favorites')
          .count()
          .as("number_of_favorites")
      )
      .withGraphFetched(
        "[subcategory.[category], comments.[user], prices, characteristics.[characteristic_name]]")
    return res.send(products);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/brief', async (req, res, next) => {
  try {
    const {
      priceOrder,
      selectedCategoryName,
      selectedSubcategoryName,
      minPrice,
      maxPrice
    } = req.query;

    const category = await Category.query()
      .where("name", selectedCategoryName);

    if (!category[0])
      return res.sendStatus(400);

    let allProducts = [];

    allProducts = await
      Product.query()
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
        .innerJoin('subcategories', 'products.subcategory_id', 'subcategories.id')
        .innerJoin('categories', 'subcategories.category_id', 'categories.id')
        .skipUndefined()
        .where("categories.name", selectedCategoryName)
        .skipUndefined()
        .where("subcategories.name", selectedSubcategoryName)
        .havingBetween('latest_price', [minPrice, maxPrice])
        // .modifyGraph('subcategory', builder => {
        //   builder.
        //     skipUndefined()
        //     .where('name', selectedSubcategoryName)
        //   // if (selectedSubcategoryName)
        //   // .select('name', 'id', 'category_id')
        // })
        .orderBy('latest_price', priceOrder);

    console.log(allProducts)
    // else {
    //   const allProducts = await Subcategory.relatedQuery('category')
    //     .for(category.id)
    //     .select('*')

    // }


    // console.log(allProducts)


    // Product.query()
    //   .findByIds(
    //     Subcategory.query()
    //       .findById(
    //         Category.query()
    //           .where('name', selectedCategoryName)
    //           .select('id')
    //       )
    //       .select('id')
    //   )
    // console.log(products)

    const product = await Product
      .query()
      .select(
        ['id', 'name', 'image_url'],
        Product.relatedQuery('favorites')
          .count()
          .as("number_of_favorites"),
        Product.relatedQuery('prices')
          .select('price')
          .orderBy('date', 'desc')
          .limit(1)
          .as('latest_price'),
        // Product.relatedQuery('subcategory')
        //   .select('id')
        //   .as('subcategory_id'),
      )
      .withGraphFetched(
        "[characteristics(defaultSelects).[characteristic_name], subcategory]")
      // .join('subcategories', 'products.subcategory_id', 'subcategories.id')
      // .skipUndefined()
      // .where('subcategories.id', selectedSubcategory)
      // .skipUndefined()
      // .where('subcategories.category_id, selectedCategoryName)
      // .skipUndefined()
      // .where('category_id', selectedCategory)
      .orderBy('latest_price', priceOrder)
    // console.log(product)
    return res.send(allProducts);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product
      .query()
      .findById(req.params.id)
      .select(
        'products.*',
        Product.relatedQuery('favorites')
          .count()
          .as("number_of_favorites")
      )
      .withGraphFetched(
        "[subcategory.[category], comments.[user], prices, characteristics.[characteristic_name]]")
    return res.send(product);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.post('/', postController);

router.patch('/:id', patchController);

router.delete('/:id', deleteController);

module.exports = router;
