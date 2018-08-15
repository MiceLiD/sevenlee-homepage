const sequelize = require('../index.js')
const Sequelize = require('sequelize')

// 定义 User 数据模型
module.exports = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING(100),
    allowNull: false,
  }
}, {
  charset: 'utf8mb4'
})
