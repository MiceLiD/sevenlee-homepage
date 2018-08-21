const Busboy = require('busboy')
const path = require('path')
const fs = require('fs')

module.exports = async (ctx, next) => {
  let req = ctx.req,
      res = ctx.res,
      busboy = new Busboy({headers: req.headers}),
      // 上传文件的目录
      serverFilePath = path.join(__dirname, '../../public/upload-file');

  await new Promise((resolve, reject) => {
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      // 写文件
      file.pipe(fs.createWriteStream(path.join(serverFilePath, filename)))
      file.on('end', () => {
        resolve(filename)
      })
    })
    busboy.on('finish', () => {
      resolve()
    })
    busboy.on('error', (err) => {
      reject(err)
    })
    req.pipe(busboy)
  }).then((filename) => {
    ctx.body = JSON.stringify({
      data: `/public/upload-file/${filename}`,
      code: 0
    })
  }).catch(err => {
    ctx.body = JSON.stringify({
      code: -1,
      data: err
    })
  })
}