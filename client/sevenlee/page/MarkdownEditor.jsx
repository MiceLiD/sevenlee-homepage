import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import { Button } from 'antd'

class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: ''
    }
  }

  handleOnChange(content) {
    this.setState({content})
  }

  handleOnSave() {
    console.log(this.state.content)
  }

  render() {
    const editorProps = {
      height: 700,
      contentFormat: 'html',
      initialContent: '<p><span style="font-family:Impact, serif">sdsdsd</span></p>',
      onChange: this.handleOnChange.bind(this),
      onSave: this.handleOnSave.bind(this)
    }
    return (
      <div>
        <BraftEditor {...editorProps}></BraftEditor>
        <div className="save-button" style={{position: 'fixed', right: '20px', bottom: '20px', zIndex: 999}}>
          <Button onClick={this.handleOnSave.bind(this)} type="primary">保存</Button>
        </div>
      </div>
    )
  }
}

export default Editor