import React, { Component } from 'react'
import band from '../assets/img/band.jpeg'
import { Tooltip, Icon, Menu, Dropdown } from 'antd'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  handleActiveRouter(current, match, location) {
    if (!match) return false
    if (current === location.pathname) {
      return true
    }
    return false
  }
  handleGetout() {
    f_Request('/get-out')
      .then(data => {
        if (data) {
          window.location.reload()
        }
      })
  }
  render() {
    const { username, code, created } = this.props.user
    const pathname = window.location.pathname
    let menuName = 'Seven'
    switch (pathname) {
      case '/sevenlee/main':
        menuName = 'Seven'
        break;
      case '/sevenlee/markdown-editor':
        menuName = 'Markdown'
        break;
      case '/sevenlee/secret':
        menuName = 'Secret'
        break;
      default:
        break;
    }
    const menu = (
      <Menu>
        <Menu.Item>
          <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/sevenlee/main')} to="/sevenlee/main">Seven</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/sevenlee/markdown-editor')} to="/sevenlee/markdown-editor">Markdown</NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/sevenlee/secret')} to="/sevenlee/secret">Secret</NavLink>
        </Menu.Item>
      </Menu>
    )
    return (
      <div className="header">
        <div className="container">
          <div className="band">
            <img src={band} alt="band"/>
          </div>
          <div className="navbar-drop-menu">
            <Dropdown trigger={["click"]} overlay={menu}>
              <span>{ menuName }</span>
            </Dropdown>
          </div>
          <div className="navbar">
            <ul>
              <li>
                <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/sevenlee/main')} to="/sevenlee/main">Seven</NavLink>
              </li>
              <li>
                <NavLink disabled style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/sevenlee/process-editor')} to="/sevenlee/process-editor">Tapu</NavLink>
              </li>
              <li>
                <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/sevenlee/markdown-editor')} to="/sevenlee/markdown-editor">Markdown</NavLink>
              </li>
              <li>
                <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/sevenlee/secret')} to="/sevenlee/secret">Secret</NavLink>
              </li>
            </ul>
          </div>
          <div className="identify-drop-menu">
            <Dropdown trigger={["click"]} overlay={
              <Menu>
                <Menu.Item>
                  <Icon style={{color: 'red', cursor: 'pointer'}} type="logout" onClick={this.handleGetout.bind(this)}/>  
                </Menu.Item>  
              </Menu>
            }>
              <span>{ username }</span>
            </Dropdown>
          </div>
          <div className="identify">
            <Icon type="smile-o" />&nbsp;
            <Tooltip placement="bottom" title={`hello! ${username}, Keep smiling`}>
              { username }
            </Tooltip>&nbsp;&nbsp;
            <Tooltip placement="bottom" title={`get out of here`}>
              <Icon style={{color: 'red', cursor: 'pointer'}} type="logout" onClick={this.handleGetout.bind(this)}/>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
}