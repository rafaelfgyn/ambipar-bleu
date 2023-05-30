const service = require('../service')
const logs = require("../../db/index")
const utils = require("../../utils")

const controller = (_, res) => {

  const array = utils.returnArrayFromText(logs)

  const payload = service(array)

  res.json(payload);
}

module.exports = controller