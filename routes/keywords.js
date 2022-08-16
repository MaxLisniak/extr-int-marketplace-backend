var express = require('express');
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

router.post('/', async (req, res, next) => {
  try {
    // new Date().toISOString().slice(0, 19).replace('T', ' ');
    const { keyword, product_id } = req.body;
    await Keyword.query()
      .insert({
        keyword,
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
    await Keyword.query()
      .deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
