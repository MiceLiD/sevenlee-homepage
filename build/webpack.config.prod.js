const path = require('path')
const baseConfig = require('./webpack.config.base.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const config = require('../config/index')

const moduleName = config.moduleName

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: path.join(__dirname, `../static/${moduleName}`),
    filename: '[name].[contenthash].js',
    // 指定静态资源服务路径，包括懒加载时的异步请求路径
    publicPath: `/static/${moduleName}/`
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin([`static/${moduleName}`], {root: path.join(__dirname, '../')}),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: `static/${moduleName}/`
    })
  ]
}