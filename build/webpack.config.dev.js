const path = require('path')
const config = require('../config/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const baseConfig = require('./webpack.config.base.js')

module.exports = {
  ...baseConfig,
  mode: 'development',
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: '[name].js',
  },
  devServer: {
    port: config.devPort
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css"
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/static/dist/'
    })
  ]
}