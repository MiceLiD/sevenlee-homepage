import React from 'react'
import { render } from 'react-dom'
import f_Request from '../utils/request.js'
window.f_Request = f_Request

import 'antd/dist/antd.css'
import './main.less'

import GetIn from './GetIn'

render(<GetIn />, document.getElementById('getIn'))