const objects = require('./objects');


async function deleteController(req, res, next) {
  try {
    const id = req.params.id
    const objName = req.baseUrl.slice(1);
    const queryResult = await objects[objName].query()
      .deleteById(id)
    if (queryResult)
      return res.sendStatus(200)
    else
      return res.sendStatus(400);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

module.exports = deleteController;