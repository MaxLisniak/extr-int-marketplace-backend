var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
const Characteristic = require('../models/Characteristic');
const CharacteristicName = require('../models/CharacteristicName');
const Product = require('../models/Product');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const characteristic_names = await CharacteristicName
      .query()
    return res.send(characteristic_names);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
})

router.get('/parameterized/', async (req, res, next) => {
  try {
    const { selectedSubcategoryName, selectedCategoryName } = req.query;
    console.log(selectedCategoryName, selectedSubcategoryName)
    if (!selectedCategoryName) return res.send("no categories")
    const characteristic_names = await CharacteristicName
      .query()
      .innerJoin('subcategories', 'subcategories.id', 'characteristic_names.for_subcategory_id')
      .innerJoin('categories', 'categories.id', 'subcategories.category_id')
      .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
      .skipUndefined()
      .where("categories.name", selectedCategoryName)
      .skipUndefined()
      .where("subcategories.name", selectedSubcategoryName)
      .withGraphFetched('characteristics(onlyUniqueValues, defaultSelects)')
    return res.send(characteristic_names);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/by-subcategory-id/:id', async (req, res, next) => {
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
});

router.get('/:id', async (req, res, next) => {
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
});

router.post('/', async function postController(req, res, next) {
  try {
    const characteristic_name = await CharacteristicName.query()
      .insert(req.body);
    if (characteristic_name) {
      const subcategory_id = characteristic_name.for_subcategory_id;
      const products = await Product.query()
        .where("subcategory_id", subcategory_id)
        .orderBy("id", "DESC");
      const characteristics = products
        .map(product => {
          return {
            characteristic_name_id: characteristic_name.id,
            product_id: product.id,
            value: ""
          }
        })
      await Characteristic.query()
        .insertGraph(characteristics);
      return res.send(characteristic_name);
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
