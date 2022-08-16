var express = require('express');
const Characteristic = require('../models/Characteristic');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const characteristics = await Characteristic
      .query()
      .withGraphFetched('characteristic_name');
    return res.send(characteristics);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const characteristic = await Characteristic
      .query()
      .findById(req.params.id)
      .withGraphFetched('characteristic_name');
    return res.send(characteristic);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { value, product_id, characteristic_name_id } = req.body;
    await Characteristic.query()
      .insert({
        value,
        product_id,
        characteristic_name_id
      });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Characteristic.query()
      .deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
