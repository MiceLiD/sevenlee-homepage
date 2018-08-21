require('dotenv').config()
const ENV = process.env

module.exports = {
  development: {
    username: 'www',
    password: 'www',
    database: 'sevenlee',
    options: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      // logging: true,
      dialectOptions: {
        charset: 'utf8mb4'
      },
      pool: {
        max: 10,
        min: 0,
        idle: 3000,
        handleDisconnects: true
      }
    }
  },
  production: {
    username: ENV['DB_USERNAME'],
    password: ENV['DB_PASSWORD'],
    database: 'sevenlee',
    options: {
      host: '66.42.97.63',
      port: 3306,
      dialect: 'mysql',
      logging: false,
      dialectOptions: {
        charset: 'utf8mb4'
      },
      pool: {
        max: 10,
        min: 0,
        idle: 3000,
        handleDisconnects: true
      }
    }
  }
}