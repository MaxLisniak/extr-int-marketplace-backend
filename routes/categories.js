var express = require('express');
const Category = require('../models/Categoty');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.query()
    return res.send(categories);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category
      .query()
      .findById(req.params.id)
    return res.send(category);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Category.query().deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
