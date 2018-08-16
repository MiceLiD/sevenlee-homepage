import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

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
      height: 500,
      contentFormat: 'html',
      initialContent: '<p><span style="font-family:Impact, serif">这是个markdown编辑器</span></p>',
      onChange: this.handleOnChange.bind(this),
      onSave: this.handleOnSave.bind(this)
    }
    const { username } = this.props.user
    return username !== 'lidongsevenlee' ? 
      (<div style={{paddingTop: '20px', textAlign: 'center'}}>这是一个markdown编辑器，但是你没有权限哟。</div>) 
      :  
      (<BraftEditor {...editorProps} />
    )
  }
}

export default Editor