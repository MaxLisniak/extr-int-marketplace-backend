var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const Characteristic = require('../models/Characteristic');
const CharacteristicName = require('../models/CharacteristicName');
const Product = require('../models/Product');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product
      .query()
      .orderBy('id', "DESC")
    return res.send(products);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query;
    const products = await Product.query()
      .whereRaw(`name like '%${q}%'`)
    return res.send(products);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/full/', async (req, res, next) => {
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

router.get('/explore', async (req, res, next) => {
  try {
    const {
      selectedCategoryName,
      selectedSubcategoryName,
    } = req.query;

    if (!selectedCategoryName || !selectedSubcategoryName) {
      return res.sendStatus(400);
    }

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
        .where("categories.name", selectedCategoryName)
        .where("subcategories.name", selectedSubcategoryName)
    // .havingBetween('latest_price', [minPrice, maxPrice])

    // .orderBy('latest_price', priceOrder);

    // const filtered = allProducts.filter(product => {
    //   let filter = true;
    //   // console.log("Considering " + product.name)
    //   for (const item of Object.entries(selectedCharacteristics)) {
    //     let [characteristic_name_id, values] = item;
    //     if (values.length === 0) continue;
    //     characteristic_name_id = Number(characteristic_name_id);
    //     // console.log("\ttesting for " + characteristic_name_id + " characteristic")
    //     for (const productChar of product.characteristics) {
    //       // console.log("checking characteristic " + productChar.characteristic_name_id)
    //       if (productChar.characteristic_name_id === characteristic_name_id) {
    //         // console.log("match!")
    //         // console.log(values)
    //         if (!values.includes(productChar.value)) {
    //           filter = false
    //         }
    //         break;
    //       }
    //     }
    //     if (!filter) break;
    //   }

    //   return filter;
    //   //make verdict for this product
    // })

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

router.post('/', async function postController(req, res, next) {
  try {
    const product = await Product.query()
      .insert(req.body);
    if (product) {
      const subcategory_id = product.subcategory_id;
      const characteristic_names = await CharacteristicName.query()
        .where("for_subcategory_id", subcategory_id)
        .orderBy("id", "DESC");
      console.log(characteristic_names);
      const characteristics = characteristic_names
        .map(characteristic_name => {
          return {
            characteristic_name_id: characteristic_name.id,
            product_id: product.id,
            value: ""
          }
        })
      await Characteristic.query()
        .insertGraph(characteristics);
      return res.send(product);
    }
    else res.sendStatus(400)
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
});

router.patch('/:id', patchController);

router.delete('/:id', deleteController);

module.exports = router;
