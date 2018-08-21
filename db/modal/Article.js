const sequelize = require('../index.js')
const Sequelize = require('sequelize')

// 定义 Article 数据模型
module.exports = sequelize.define('article', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  star: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  star_er: {
    type: Sequelize.TEXT,
    allowNull: true,
  }
}, {
  charset: 'utf8mb4'
})
