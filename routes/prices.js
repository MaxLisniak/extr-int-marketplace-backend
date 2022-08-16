var express = require('express');
const Price = require('../models/Price');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const prices = await Price.query()
    return res.send(prices);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const price = await Price
      .query()
      .findById(req.params.id)
    return res.send(price);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // new Date().toJSON().slice(0, 10)
    const { price, date, product_id } = req.body;
    await Price.query()
      .insert({
        price,
        date,
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
    await Price.query()
      .deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
