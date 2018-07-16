const path = require('path')
const baseConfig = require('./webpack.config.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const config = require('../config/index')

const moduleName = config.moduleName

module.exports = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: path.join(__dirname, `../static/${moduleName}`),
    filename: '[name].[hash].js',
  },
  performance: {
    hints: false
  },
  plugins: [
    new CleanWebpackPlugin([`static/${moduleName}`], {root: path.join(__dirname, '../')}),
    new MiniCssExtractPlugin({
      filename: "index.[hash].css"
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: `static/${moduleName}/`
    })
  ]
}