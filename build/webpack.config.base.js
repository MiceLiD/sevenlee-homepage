const path = require('path')
module.exports = {
  entry: {
    main: path.join(__dirname, '../client/main.jsx')
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    // 默认匹配后缀
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.join(__dirname, '../client')
    }
  },
  module: {
      rules: [
        {
            test: /\.(jsx)$/,
            loader: 'babel-loader',
            exclude: [
              path.join(__dirname, '../node_modules')
            ]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
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