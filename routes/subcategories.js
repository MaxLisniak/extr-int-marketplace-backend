var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
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
router.get('/by-category-id/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const subcategories =
      await Category
        .relatedQuery('subcategories')
        .for(id)
    // .withGraphFetched("category")
    return res.send(subcategories);
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
