var express = require('express');
const Category = require('../models/Categoty');
var router = express.Router();
const objection = require('objection');

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

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    await Category.query()
      .insert({ name });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
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
