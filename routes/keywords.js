var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
const Keyword = require('../models/Keyword');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const keywords = await Keyword.query()
    return res.send(keywords);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const keyword = await Keyword
      .query()
      .findById(req.params.id)
    return res.send(keyword);
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
