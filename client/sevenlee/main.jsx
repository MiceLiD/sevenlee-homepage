import React from 'react'
import { render } from 'react-dom'
import f_Request from '../utils/request.js'
window.f_Request = f_Request

import 'antd/dist/antd.css'
import './assets/style/reset.less'
import './assets/style/app.less'
import './assets/img/favicon.ico'

import App from './App.jsx'
const el = document.getElementById('app')
const user = JSON.parse(el.dataset.user)

render(<App user={user} />, el)