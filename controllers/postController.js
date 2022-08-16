const objects = require('./objects');


async function postController(req, res, next) {
  try {
    const objName = req.baseUrl.slice(1);
    await objects[objName].query()
      .insert(req.body);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
}

module.exports = postController;