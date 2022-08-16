var express = require('express');
const Category = require('../models/Categoty');
const Subcategory = require('../models/Subcategory');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const subcategories =
      await Subcategory.query()
        .withGraphFetched("category")
    return res.send(subcategories);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const subcategory =
      await Subcategory.query()
        .findById(req.params.id)
        .withGraphFetched("category")
    return res.send(subcategory);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, category_id } = req.body;
    await Subcategory.query()
      .insert({ name, category_id });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Subcategory.query()
      .deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
