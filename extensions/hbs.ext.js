const fs = require('fs')
const path = require('path')
const config = require('../config/index')
const fetch = require('node-fetch')
const isDev = process.env.NODE_ENV === 'development'
const moduleName = config.moduleName

module.exports = {
    xIco: () => isDev ? 
      `<link rel="shortcut icon" href="http://localhost:${config.devPort}/favicon.ico">` : 
      `<link rel="shortcut icon" href="/static/${moduleName}/favicon.ico">`,

    xStyle: async () => {
      let manifestArr = await getManifest('css')

      return manifestArr.map(item => {
        return `<link rel="stylesheet" href="${item}">`
      }).join('')
    },
    xScript: async () => {
      let manifestArr = await getManifest('js')

      return manifestArr.map(item => {
        return `<script src="${item}"></script>`
      }).join('')
    }
}

async function getManifest(category) {
  if (isDev) {
    return await fetch(`http://localhost:${config.devPort}/manifest.json`).then(res => res.json())
      .then(json => Object.entries(json)
        .map(item => item[1])
        .filter(item => !item.includes('map') && item.includes(category))
        .map(item => `http://localhost:${config.devPort}/${item}`))

  } else {
    let _json = fs.readFileSync(path.join(__dirname, `../static/${moduleName}/manifest.json`), 'utf8')
    _json = JSON.parse(_json)
    return Object.entries(_json)
      .map(item => item[1])
      .filter(item => item.includes(category))
      .map(item => `/static/${moduleName}/${item}`)
  }
}