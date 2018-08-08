import React, { Component } from 'react'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      username: 'loading'
    }
  }
  componentDidMount() {
    let o = [1,2]
    o = [...o, 3]
    f_Request('/getusername')
      .then(data => {
        this.setState({username: data.username})
      })
  }
  render() {
    return (
      <div style={{padding: '20px'}}>
        这是主页 {this.state.username}
      </div>
    )
  }
}

export default Main