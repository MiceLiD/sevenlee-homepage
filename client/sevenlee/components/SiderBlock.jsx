import React, { Component } from 'react'
import { Icon } from 'antd'
import Texty from 'rc-texty'
import 'rc-texty/assets/index.css';

export default class SiderBlock extends Component {
  constructor() {
    super()
    this.state = {
      option1: {
        type: 'flash',
        interval: 1000
      },
      option2: {
        type: 'bounce',
        interval: 1000,
        delay: 1000
      }  
    }
  }
  render() {
    return (
      <div className="right-sider">
        <div className="block">
          <Texty
            {...this.state.option1}>
            advertising
          </Texty>
          
        </div>
        <div className="block">
          <Texty
            {...this.state.option2}>
            advertising
          </Texty>
        </div>
        <div className="block more-block">
          Hi, I'm sevenlee,
          Do you want contact with me ? <br/>
          <Icon type="wechat" /> 17610851709
        </div>
      </div>
    )
  }
}