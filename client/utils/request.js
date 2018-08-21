import config from '../../config/index'
export default async (path, payload, isForm) => {
  return await fetch(`${window.location.origin}${config.appPrefix}/api${path}`, {
    method: 'POST',
    mode: 'cors',
    body: isForm ? payload : JSON.stringify(typeof payload === 'object' ? payload : {}),
    credentials: 'same-origin',
    headers: isForm ? {} : { 'content-type': 'application/json' }
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