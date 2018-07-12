import 'babel-polyfill'
const config = require('../../config/index')
export default async (path, payload) => {
  return await fetch(`${window.location.origin}${config.appPrefix}/api${path}`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(typeof payload === 'object' ? payload : {}),
    credentials: 'same-origin',
    headers: { 'content-type': 'application/json' }
  })
  .then(res => res.json())
  .then(res => {
    if (res.code) {
      alert(res.data)
      return null
    } else {
      return res.data
    }
  })
  .catch(err => {
    return null
    alert(err)
  })
}