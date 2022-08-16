var express = require('express');
const Product = require('../models/Product');
var router = express.Router();

router.get('/', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
  try {
    const { name, description, image_url, subcategory_id } = req.body;
    await Product.query()
      .insert({
        name,
        description,
        image_url,
        subcategory_id
      });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.query()
      .deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
