import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { Layout } from 'antd'

const { Content }  = Layout
import Loadable from 'react-loadable'

const Loading = () => (<div className="loading-bar"></div>)
import Header from './components/Header'
import SiderBlock from './components/SiderBlock'

const MarkdownEditorAsync = Loadable({
  loader: () => import(`./page/MarkdownEditor`),
  loading: Loading
})
const ProcessEditorAsync = Loadable({
  loader: () => import(`./page/ProcessEditor`),
  loading: Loading
})
const SecretAsync = Loadable({
  loader: () => import(`./page/Secret`),
  loading: Loading
})
const MainAsync = Loadable({
  loader: () => import(`./page/Main`),
  loading: Loading
})



class App extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { user } = this.props
    return (
      <div className="app">
        <Router>
          <div className="wrapper">
            <Header user={ user } />
            <div className="content-wrapper">
              <Content className="content">
                <Route path="/main" render={props => <MainAsync {...props} user={ user } />}></Route>
                <Route path="/markdown-editor" render={props => <MarkdownEditorAsync {...props} user={ user } />  }></Route>
                <Route path="/process-editor" component={ ProcessEditorAsync }></Route>
                <Route path="/secret" component={ SecretAsync }></Route>
              </Content>
              <SiderBlock />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App