const objects = require('./objects');


async function postController(req, res, next) {
  try {
    const objName = req.baseUrl.slice(1);
    const queryResult = await objects[objName].query()
      .insert(req.body);
    if (queryResult) {
      return res.send(queryResult);
    }
    else res.sendStatus(400)
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
}

module.exports = postController;