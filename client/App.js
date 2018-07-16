import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      
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

  handleOnChange(content) {
    console.log(content)
  }

  handleOnRawChange(rawContent) {
    console.log(rawContent)
  }

  render() {
    const editorProps = {
      height: 700,
      contentFormat: 'html',
      initialContent: '<p>welcome to sevenlee.cf</p>',
      onChange: this.handleOnChange,
      onRowChange: this.handleOnRawChange
    }
    return (
      <div>
        <BraftEditor {...editorProps}></BraftEditor>
      </div>
    )
  }
}

export default App