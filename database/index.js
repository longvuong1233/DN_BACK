const config = require("./config")

var db = require("mysql")

module.exports = db.createConnection(config)