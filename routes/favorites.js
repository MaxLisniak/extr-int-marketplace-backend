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

router.post('/toggle', async (req, res) => {
  try {
    const { product_id, user_id } = req.body;
    console.log(req.body)
    const fav = await Favorite.query()
      .findOne({ product_id, user_id });
    if (!fav) {
      await Favorite.query()
        .insert({
          product_id,
          user_id
        })
    } else {
      await Favorite.query()
        .deleteById(fav.id);
    }
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

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
