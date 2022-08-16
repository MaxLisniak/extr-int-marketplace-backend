var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
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

router.post('/', postController);

router.patch('/:id', patchController);

router.delete('/:id', deleteController);

module.exports = router;
