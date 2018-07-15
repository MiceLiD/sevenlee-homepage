const path = require('path')
const webpack = require('webpack')
const polyfill = require('babel-polyfill')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: {
    index: path.join(__dirname, '../client/index.js'),
    vendor: ['react', 'react-dom']
  },
  module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: [
              path.join(__dirname, '../node_modules')
            ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff2?|ttf|otf|ico)(\?.*)?$/,
            use: 'url-loader'
        }, 
        {
            test: /\.ico$/,
            loader: 'file-loader?name=[name].[ext]'
        }
    ]
  }
}