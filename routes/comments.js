var express = require('express');
const Comment = require('../models/Comment');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.query()
      .withGraphFetched("user")
    return res.send(comments);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comment
      .query()
      .findById(req.params.id)
      .withGraphFetched("user")
    return res.send(comment);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) => {
  try {
    // new Date().toISOString().slice(0, 19).replace('T', ' ');
    const { text, created, user_id, product_id } = req.body;
    await Comment.query()
      .insert({
        text,
        created,
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
    await Comment.query().deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
