var express = require('express');
const deleteController = require('../controllers/deleteController');
const patchController = require('../controllers/patchController');
const postController = require('../controllers/postController');
const User = require('../models/User');
var router = express.Router();
const { signin, signup, signout, handleRefreshToken } = require("../controllers/user");

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
router.get('/refresh', handleRefreshToken);

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

router.post('/', postController);

router.patch('/:id', patchController);

router.delete('/:id', deleteController);

router.post('/sign-in', signin);

router.post('/sign-out', signout);

router.post('/sign-up', signup);


module.exports = router;
