const fs = require("fs")

const logs = fs.readFileSync("./db/Server-log.txt", 'utf8')

module.exports = logs