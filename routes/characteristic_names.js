var express = require('express');
const CharacteristicName = require('../models/CharacteristicName');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const characteristic_names = await CharacteristicName
      .query()
    return res.send(characteristic_names);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const characteristic_name = await CharacteristicName
      .query()
      .findById(req.params.id);
    return res.send(characteristic_name);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    await CharacteristicName.query()
      .insert({ name });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await CharacteristicName.query()
      .deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
