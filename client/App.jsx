import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import { Layout, Icon, Menu } from 'antd'

const { Content }  = Layout
import Loadable from 'react-loadable'
import './assets/style/app.less'

function Loading() {
  return <div>loading</div>
}

const MarkdownEditorAsync = Loadable({
  loader: () => import(`./page/MarkdownEditor`),
  loading: Loading
})
const ProcessEditorAsync = Loadable({
  loader: () => import(`./page/ProcessEditor`),
  loading: Loading
})
const OtherAsync = Loadable({
  loader: () => import(`./page/Other`),
  loading: Loading
})
const MainAsync = Loadable({
  loader: () => import(`./page/Main`),
  loading: Loading
})



class App extends Component {
  constructor() {
    super()
    this.state = {
      expend: false,
      selectedKey: window.location.pathname
    }
  }

  handleMenuClick() {
    this.setState({expend: !this.state.expend})
  }
  render() {
    const expend = this.state.expend
    const selectedKey = this.state.selectedKey
    return (
      <Router>
        <div className="wrapper">
          <div className={expend ? 'expend sider' : 'sider'}>
            <img onClick={this.handleMenuClick.bind(this)} src={require('./assets/img/menu.png')} alt=""/>
            <Menu
              style={{marginTop: '30px', display: expend ? 'block' : 'none', textAlign: 'left'}}
              defaultSelectedKeys={[selectedKey]}
              mode="inline"
              theme="dark"
              inlineCollapsed={!expend}>
              <Menu.Item key="/markdown-editor">
                <NavLink to="/markdown-editor">
                  <Icon type="smile-o" />
                  <span>markdown editor</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/process-editor">
                <NavLink to="/process-editor">
                  <Icon type="smile-o" />
                  <span>process editor</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/other">
                <NavLink to="/other">
                  <Icon type="smile-o" />
                  <span>other</span>
                </NavLink>
              </Menu.Item>
            </Menu>
            <div className="logo">
              <NavLink to="/index">SEVENLEE</NavLink>
            </div>
          </div>
          <Content className="content">
            <Route path="/index" component={ MainAsync }></Route>
            <Route path="/markdown-editor" component={ MarkdownEditorAsync }></Route>
            <Route path="/process-editor" component={ ProcessEditorAsync }></Route>
            <Route path="/other" component={ OtherAsync }></Route>
          </Content>
        </div>
      </Router>
    )
  }
}

export default App