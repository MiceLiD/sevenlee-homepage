import React, { Component } from 'react'
import { Icon, Tooltip } from 'antd'

import './styles/graph-creator.css'
import processCreator from  './scripts/graph-creator-2.js'

class ProcessEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHelp: true
    }
  }

  componentDidMount() {
    let items = []
    this.timer = setInterval(() => {
      items = this.props.items
      if (!items || items.length) {
        clearInterval(this.timer)
        this.initProcessEditor()
      }
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  handleOnCLickHelp() {
    this.setState({showHelp: !this.state.showHelp})
  }
  initProcessEditor() {
    const props = this.props
    const initData = props.initData
    const items = props.items
    const mapColor = props.mapColor
    const onDagCompleted = props.onDagCompleted || null
    if (!items) {
      processCreator(window.d3, [], initData, onDagCompleted, mapColor)
    } else if (items && items.length !== 0) {
      processCreator(window.d3, items, initData, onDagCompleted, mapColor)
    }
  }

  render() {
    return (
      <div id="container" style={{minHeight: '500px'}}>
        <div id="toolbox" style={this.props.items ? {} : {display: 'none'}}>
          <Tooltip title={this.state.showHelp ? "关闭帮助面板" : "打开帮助面板"}>
            <Icon type="question-circle-o" id="help" className={this.state.showHelp ? 'active' : ''} onClick={this.handleOnCLickHelp.bind(this)} />
          </Tooltip>
          <Tooltip title="归位">
            <Icon type="sync" id="reset-zoom"/>
          </Tooltip>
          <Tooltip title="标记完成">
            <Icon type="check-circle-o" id="download-input"/>
          </Tooltip>
          <Tooltip title="删除节点">
            <Icon type="delete" id="delete-graph-one"/>
          </Tooltip>
          <Tooltip title="清空画布">
            <Icon type="close" id="delete-graph-all"/>
          </Tooltip>
        </div>
        <div id="helpbox" className={this.state.showHelp ? 'active' : ''}>
          <li style={{color: 'red'}}><strong>这是一个流程图编辑器！</strong></li>
          <li><strong>创建节点：</strong>Shift + Click</li>
          <li><strong>创建连接线：</strong>光标移到任务节点，Shift + Click + 拖动</li>
          <li><strong>删除（节点或连接线）：</strong>选中节点或连接线，紫色形态即为选中，点击删除图标删除</li>
          <li><strong>删除全图：</strong>点击删除全图图标删除</li>
          <li><strong>分配任务（名称+id）：</strong>选中节点，紫色形态即为选中，左上角选择任务</li>
          <li><strong>移动节点：</strong>拖动节点</li>
          <li><strong>移动视图：</strong>拖动空白区域</li>
          <li><strong>调节视图：</strong>鼠标滚轮滚动或触控板</li>
        </div>
        {/* <script>$('#helpbox').click(function(){ $(this).addClass('hidden'); })</script> */}
      </div>
    )
  }
}

export default ProcessEdit