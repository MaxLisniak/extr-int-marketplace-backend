var express = require('express');
const { val } = require('objection');
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
      maxPrice,
    } = req.query;

    let { selectedCharacteristics } = req.query;
    selectedCharacteristics = JSON.parse(selectedCharacteristics);

    const category = await Category.query()
      .where("name", selectedCategoryName);

    if (!category[0])
      return res.sendStatus(400);



    const allProducts = await
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
        .skipUndefined()
        .where("categories.name", selectedCategoryName)
        .skipUndefined()
        .where("subcategories.name", selectedSubcategoryName)
        .havingBetween('latest_price', [minPrice, maxPrice])
        // .innerJoin(
        //   "characteristics",
        //   "characteristics.product_id",
        //   "products.id"
        // )
        .orderBy('latest_price', priceOrder);

    const filtered = allProducts.filter(product => {
      let filter = true;
      // console.log("Considering " + product.name)
      for (const item of Object.entries(selectedCharacteristics)) {
        let [characteristic_name_id, values] = item;
        if (values.length === 0) continue;
        characteristic_name_id = Number(characteristic_name_id);
        // console.log("\ttesting for " + characteristic_name_id + " characteristic")
        for (const productChar of product.characteristics) {
          // console.log("checking characteristic " + productChar.characteristic_name_id)
          if (productChar.characteristic_name_id === characteristic_name_id) {
            // console.log("match!")
            // console.log(values)
            if (!values.includes(productChar.value)) {
              filter = false
            }
            break;
          }
        }
        if (!filter) break;
      }

      return filter;
      //make verdict for this product
    })

    // subquery += `where characteristics.characteristic_name_id = ${characteristic_name_id}\n`;
    // values.map(value => {
    //   subquery += `\tand characteristics.value = "${value}"\n`
    // })


    // console.log(selectedCharacteristics)
    // console.log("all products")
    // console.log(allProducts.map(p => p.name))
    // console.log("filtered")
    // console.log(filtered.map(p => p.name))

    // allProducts.map(prod => {
    //   console.log(prod.characteristics)
    // })
    return res.send(filtered);
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
