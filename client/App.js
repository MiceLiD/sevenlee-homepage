import React, { Component } from 'react'

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
      no problem {this.state.username}
    </div>
  }
}

export default App