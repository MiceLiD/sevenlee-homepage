
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const pordConfig = require('./webpack.config.prod.js')

module.exports = {
  ...pordConfig,
  plugins: [
    ...pordConfig.plugins,
    new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        generateStatsFile: true
    })
  ]
}