var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
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

router.post('/', postController);

router.patch('/:id', patchController);

router.delete('/:id', deleteController);

module.exports = router;
