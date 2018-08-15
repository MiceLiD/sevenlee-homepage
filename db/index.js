const Sequelize = require('sequelize')
const env = process.env.NODE_ENV
const config = require('./config/index')[env]

module.exports = new Sequelize(
  config.database, 
  config.username,
  config.password,
  config.options
)