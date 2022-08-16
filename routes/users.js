var express = require('express');
const User = require('../models/User');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.query()
    return res.send(users);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const users = await User.query()
      .findById(req.params.id)
    return res.send(users);
  } catch (err) {
    console.log(err);
    // Internal Server Error
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { first_name, last_name } = req.body;
    await User.query()
      .insert({ first_name, last_name });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.query()
      .deleteById(req.params.id)
    return res.sendStatus(200)
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
})

module.exports = router;
