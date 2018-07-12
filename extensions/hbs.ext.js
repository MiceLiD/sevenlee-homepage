const fs = require('fs')
const path = require('path')
const config = require('../config/index')
const NODE_ENV = process.env.NODE_ENV
const moduleName = config.moduleName

module.exports = {
    xStyle: (filename) => {
        if (NODE_ENV === 'development') {
            return `http://localhost:${config.devPort}/${filename}.css`
        } else {
            let data = fs.readFileSync(path.join(__dirname, `../static/${moduleName}/manifest.json`), 'utf-8')
            data = JSON.parse(data)
            return `/static/${moduleName}/${data[`static/${moduleName}/${filename}.css`]}`
        } 
    },
    xIco: () => {
        if (NODE_ENV === 'development') {
            return `http://localhost:${config.devPort}/favicon.ico?`
        } else {
            return `/static/${moduleName}/favicon.ico`
        }
    },
    xScript: (filename) => {
        if (NODE_ENV === 'development') {
            return `http://localhost:${config.devPort}/${filename}.js`
        } else {
            let data = fs.readFileSync(path.join(__dirname, `../static/${moduleName}/manifest.json`), 'utf-8')
            data = JSON.parse(data)
            return `/static/${moduleName}/${data[`static/${moduleName}/${filename}.js`]}`
        }   
    }
}