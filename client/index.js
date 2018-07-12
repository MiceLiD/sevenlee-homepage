import React, { Component } from 'react'
import { render } from 'react-dom'
import f_Request from './utils/request.js'
window.f_Request = f_Request

import './favicon.ico'
import style from './main.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      username: 'loading...'
    }
  }
  componentWillMount() {
    f_Request('/getusername', {})
      .then(data => {
        if (!data) return
        this.setState({
          username: data.username
        })
      })
  }
  render() {
    return <div style={{textAlign: 'center', paddingTop: '100px'}}>
      hello react and {this.state.username}
    </div>
  }
}

render(<App />, document.getElementById('app'))