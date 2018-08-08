import React, { Component } from 'react'

class Other extends Component {
  render() {
    return (
      <div style={{padding: '20px'}}>
        不支持老式浏览器！！<br/>
        移除babel-polyfill <br/>
        移除转换es6的代码
      </div>
    )
  }
}

export default Other