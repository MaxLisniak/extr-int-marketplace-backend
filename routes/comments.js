var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken');
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

router.get('/for-product/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await Comment.query()
      .where("product_id", id)
      .orderBy("created", 'DESC')
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

router.post('/', [verifyToken, postController]);

router.patch('/:id', patchController);

router.delete('/:id', deleteController);

module.exports = router;
