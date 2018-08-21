import React, { Component } from 'react'
import Texty from 'rc-texty'
import 'rc-texty/assets/index.css';

class Secret extends Component {
  constructor() {
    super()
    this.state = {
      option: {
        type: 'left',
        interval: 100
      } 
    }
  }
  render() {
    return (
      <div style={{padding: '20px', fontSize: '16px', lineHeight: 2}}>
        <Texty
          {...this.state.option}>
          无数的人际交互场景，总是表面的迎合，假装的开心。但，孤独总写在脸上。他们都看得见，却也看不见。
          细腻到不自然地融入同类人的内心深处，担心着突如其来的愤怒和崩溃。
          期望着合家欢的场面，不希望任何人假装着快乐。
          似乎总是在错过什么，却也怎么也迈不出现实的一步。
          在感情的世界里，更依赖被爱，或许我还没有遇见我想去爱的人。那时的我会是什么样子的。
          恨自己还如小孩般怯懦
        </Texty>
        
      </div>
    )
  }
}

export default Secret