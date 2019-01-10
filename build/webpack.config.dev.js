const path = require('path')
const config = require('../config/index')
const ManifestPlugin = require('webpack-manifest-plugin')
const baseConfig = require('./webpack.config.base.js')
const webpack = require('webpack')

module.exports = {
  ...baseConfig,
  mode: 'development',
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: '[name].js',
    // 指定静态资源服务路径，包括懒加载时的异步请求路径
    publicPath: `http://localhost:${config.devPort}/`
  },
  devServer: {
    port: config.devPort,
    hot: true,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET'
    }
  },
  // 调试时显示正确的行，不生成map实际文件
  devtool: 'eval-source-map',
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/static/dist/'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}