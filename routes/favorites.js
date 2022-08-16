var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
const Favorite = require('../models/Favorite');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const favorites = await Favorite.query()
    return res.send(favorites);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const favorite = await Favorite
      .query()
      .findById(req.params.id)
    return res.send(favorite);
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
