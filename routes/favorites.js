var express = require('express');
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

router.post('/', async (req, res, next) => {
  try {
    // new Date().toISOString().slice(0, 19).replace('T', ' ');
    const { user_id, product_id } = req.body;
    await Favorite.query()
      .insert({
        user_id,
        product_id
      });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Favorite.query()
      .deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
