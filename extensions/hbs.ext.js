const config = require('../config/index')
const handlebars = require('handlebars')
const isDev = process.env.NODE_ENV === 'development'
const moduleName = config.moduleName

const manifestJson = isDev ? {} : require(`../static/${moduleName}/manifest.json`)
const devPath = `http://localhost:${config.devPort}`
const prodPath = `static/${moduleName}`

module.exports = {
  agree_button: () => {
      let emotion = handlebars.escapeExpression(this.emotion),
          name = handlebars.escapeExpression(this.name);
      return new handlebars.SafeString("<button>I agree. I " + emotion + " " + name + "</button>")
  },
  xIco: () => isDev ? 
    `<link rel="shortcut icon" href="${devPath}/favicon.ico">` : 
    `<link rel="shortcut icon" href="${prodPath}/favicon.ico">`,

  xStyle: (name) =>  isDev ? 
    `<link rel="stylesheet" href="${devPath}/${name}.css">` : 
    `<link rel="stylesheet" href="${manifestJson[`${prodPath}/${name}.css`]}">`,

  xScript: (name) =>  isDev ? 
    `<script src="${devPath}/${name}.js"></script>` : 
    `<script src="${manifestJson[`${prodPath}/${name}.js`]}"></script>`
}