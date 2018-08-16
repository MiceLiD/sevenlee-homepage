import React, { Component } from 'react'
import band from '../assets/img/band.jpeg'
import { Tooltip, Icon } from 'antd'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  handleActiveRouter(current, match, location) {
    if (!match) return false
    if (current === location.pathname) {
      return true
    }
    return false
  }
  render() {
    const { username, code, created } = this.props.user
    return (
      <div className="header">
        <div className="container">
          <div className="band">
            <img src={band} alt="band"/>
          </div>
          <div className="navbar">
            <ul>
              <li>
                <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/main')} to="/main">Seven</NavLink>
              </li>
              <li>
                <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/process-editor')} to="/process-editor">Tapu</NavLink>
              </li>
              <li>
                <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/markdown-editor')} to="/markdown-editor">Markdown</NavLink>
              </li>
              <li>
                <NavLink style={{ textDecoration: 'none' }} isActive={this.handleActiveRouter.bind(this, '/other')} to="/other">Other</NavLink>
              </li>
            </ul>
          </div>
          <div className="identify">
            <Icon type="smile-o" />&nbsp;
            <Tooltip placement="bottom" title={`hello! ${username}, Keep smiling`}>
              { username }
            </Tooltip>&nbsp;&nbsp;
            <Tooltip placement="bottom" title={`get out of here`}>
              <Icon style={{color: 'red', cursor: 'pointer'}} type="logout" onClick={() => {window.location.replace('/getout')}}/>
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
}