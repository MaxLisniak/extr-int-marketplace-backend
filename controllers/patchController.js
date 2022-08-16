const objects = require('./objects');


async function patchController(req, res, next) {
  try {
    const id = req.params.id
    const objName = req.baseUrl.slice(1);
    const queryResult = await objects[objName].query()
      .findById(id)
      .patch(req.body);
    if (queryResult)
      return res.sendStatus(200)
    else res.sendStatus(400)
  } catch (err) {
    console.log(err);
    return res.sendStatus(400)
  }
}

module.exports = patchController;