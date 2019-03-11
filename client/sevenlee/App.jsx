import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { Layout, Icon } from 'antd'

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
const ArticleDetail = Loadable({
  loader: () => import(`./page/ArticleDetail`),
  loading: Loading
})



class App extends Component {
  constructor() {
    super()
    this.state = {
      showTopBtn: false
    }
  }
  
  componentDidMount() {
    window.onscroll = () => {
      if (window.scrollY) {
        this.setState({ showTopBtn: true })
      } else {
        this.setState({ showTopBtn: false })
      }
    }
  }
  handleOnGoTop() {
    const _this = this
    this.timmer = requestAnimationFrame(function fn(){
      let s = window.scrollY
      if(s > 0){
          s -= 100
          window.scroll(0, s)
          _this.timmer = requestAnimationFrame(fn)
      }
    })
    
  }
  render() {
    const { user } = this.props
    const { showTopBtn } = this.state
    return (
      <Router>
        <div className="app-wrapper">
          <Header user={ user } />
          <div className="content-wrapper" >
            <Content className="content">
              <Route path="/sevenlee/main" render={props => <MainAsync {...props} user={ user } />}></Route>
              <Route path="/sevenlee/detail" render={props => <ArticleDetail {...props} user={ user } />}></Route>
              <Route path="/sevenlee/markdown-editor" render={props => <MarkdownEditorAsync {...props} user={ user } />  }></Route>
              <Route path="/sevenlee/process-editor" component={ ProcessEditorAsync }></Route>
              <Route path="/sevenlee/secret" component={ SecretAsync }></Route>
            </Content>
            <SiderBlock />
            <div className="top-btn" style={{opacity: showTopBtn ? 1 : 0}} onClick={this.handleOnGoTop.bind(this)}>
              <Icon type="up-square" />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App