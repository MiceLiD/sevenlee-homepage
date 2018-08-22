import React, { Component } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
import querystring from 'query-string'
import { Icon, notification, Input, Button, Row, Col } from 'antd'

class Editor extends Component {
  constructor() {
    super()
    this.contentId = new Date().getTime()
    this.state = {
      content: '',
      contentId: 0,
      articleTitle: ''
    }
  }
  componentDidMount() {
    this._mounted = true
    const { search } = this.props.location
    if (!search ) return
    const o = querystring.parse(search)
    if (o.id && !isNaN(o.id)) {
      f_Request('/get-article', { id: o.id })
        .then(data => {
          const rows = data.rows
          if (!rows.length) return
          this.setState({
            content: data.rows[0].content,
            contentId: o.id,
            articleTitle: data.rows[0].title
          })
        })
    }
  }
  componentWillUnmount() {
    this._mounted = false
  }

  handleOnChange(content) {
    if (!this._mounted) return
    this.setState({content})
  }
  

  handleOnSave(contentId) {
    if (!this._mounted) return
    if (!this.state.articleTitle || !this.state.content) {
      notification.warn({
        message: '操作失败',
        description: '未设置标题或未填写内容'
      })
      return
    } 
    if (contentId) {
      f_Request('/update-article', {
        id: this.state.contentId,
        fields: {
          content: this.state.content,
          title: this.state.articleTitle
        }
      })
      .then(data => {
        notification.success({
          message: '更新成功',
          duration: 2,
          description: `id ${contentId}`
        })
        this.props.history.push('/main')
      })
    } else {
      f_Request('/set-article', {
        content: this.state.content,
        title: this.state.articleTitle
      })
      .then(data => {
        notification.success({
          message: '创建成功',
          duration: 2,
          description: `id ${data.id}`
        })
        this.props.history.push('/main')
      })
    }
  }
  handleUploadFn(params) {
    if (!this._mounted) {
      return
    }
    const formData = new FormData()
    formData.append('file', params.file)
    f_Request('/upload', formData, true)
      .then(data => {
        params.success({
          url: data,
          meta: {}
        })
      })
  }
  handleOnTitleChange(e) {
    this.setState({
      articleTitle: e.target.value
    })
  }

  render() {
    const { contentId, content, articleTitle } = this.state
    const { username, code } = this.props.user
    const disabled = !(username === 'lidongsevenlee' && code === '930903')
    const editorProps = {
      height: 500,
      disabled: disabled,
      contentFormat: 'html',
      contentId: contentId,
      initialContent: content,
      onChange: this.handleOnChange.bind(this),
      onSave: this.handleOnSave.bind(this, contentId),
      media: {
        uploadFn: this.handleUploadFn.bind(this)
      }
    }
    const footerStyle = {
      position: 'absolute', 
      bottom: '10px', 
      right: '10px', 
      fontSize: '25px',
      cursor: 'pointer',
      zIndex: 999
    }
    return (
      <div className="container markdown" style={{position: 'relative'}}>
        <BraftEditor {...editorProps} />
        <Row style={footerStyle} gutter={10}>
          <Col span={18}>
            <Input disabled={disabled} placeholder="键入标题" value={articleTitle} onChange={this.handleOnTitleChange.bind(this)} />
          </Col>
          <Col span={6}>
            <Button disabled={disabled} type="primary" onClick={this.handleOnSave.bind(this, contentId)}>
              {contentId ? <Icon type="sync" /> : <Icon type="save" />}
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Editor