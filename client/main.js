import React, { Component } from 'react'
import { render } from 'react-dom'
import f_Request from './utils/request.js'
window.f_Request = f_Request

import 'antd/dist/antd.css'

import './assets/style/main.less'
import './assets/img/favicon.ico'

import App from './App.js'

render(<App />, document.getElementById('app'))