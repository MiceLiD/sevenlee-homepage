import React, { Component } from 'react'
import Texty from 'rc-texty'
import 'rc-texty/assets/index.css';

class Main extends Component {
  constructor() {
    super()
    this.state = {
      option: {
        type: 'scaleBig',
        interval: 300
      } 
    }
  }
  render() {
    return (
      <div style={{padding: '100px', fontSize: '20px'}}>
        <Texty
          {...this.state.option}>
          这里是主页呀！
        </Texty>
        
      </div>
    )
  }
}

export default Main