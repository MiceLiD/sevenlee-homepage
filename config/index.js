const path = require('path')
module.exports = {
  devPort: 5000,
  nodePort: 8010,
  moduleName: 'framework',
  nodeSocket: path.join(__dirname, '../shared/sockets/node.sock'),
  nodePidPath: path.join(__dirname, '../shared/pids/node.pid'),
  appPrefix: '',
  logDir: path.join(__dirname, '../shared/logs')
}