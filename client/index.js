import React, { Component } from 'react'
import { render } from 'react-dom'
import f_Request from './utils/request.js'
window.f_Request = f_Request

import './favicon.ico'
import style from './main.css'

import App from './App'

render(<App />, document.getElementById('app'))