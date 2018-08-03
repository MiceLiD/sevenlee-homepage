const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: {
    index: path.join(__dirname, '../client/main.js')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // which includes all code from node_modules in the whole application
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
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
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
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