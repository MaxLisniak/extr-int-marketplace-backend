var express = require('express');
const Category = require('../models/Categoty');
var router = express.Router();
const objection = require('objection');
const patchController = require('../controllers/patchController');
const deleteController = require('../controllers/deleteController');
const postController = require('../controllers/postController');

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.query()
      .orderBy('id', 'DESC');
    return res.send(categories);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/extended/', async (req, res, next) => {
  try {
    const categories = await Category.query()
      .withGraphFetched('subcategories')
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
      .withGraphFetched('subcategories')
    return res.send(category);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
})

router.post('/', postController);

router.patch('/:id', patchController);

router.delete('/:id', deleteController);

module.exports = router;
