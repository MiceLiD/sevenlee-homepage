import React, { Component } from 'react'
import Editor from './processEdit/Editor.jsx'

class ProcessEditor extends Component {
  constructor() {
    super()
    this.state = {
      allTasks: [
        {
          name: 'a',
          id: 0,
        },
        {
          name: 'b',
          id: 1,
        },
        {
          name: 'c',
          id: 2,
        }
      ]
    }
  }
  handleDagComplete(dag) {
    console.log(dag)
  }
  render() {
    let nodes = [{
        title: "a",
        id: 0,
        x: 221,
        y: 173
      }, {
        title: "b",
        id: 1,
        x: 516,
        y: 124
    }];
    let edges = [{
      source: nodes[1],
      target: nodes[0]
    }]
    let initData = {nodes, edges}
    return (
      <div className="container process">
        <Editor items={this.state.allTasks} initData={initData} onDagCompleted={this.handleDagComplete.bind(this)}></Editor>
      </div>
    )
  }
}

export default ProcessEditor