import React, { Component } from 'react'
import { Icon, Popconfirm, Card, Avatar, notification, Spin } from 'antd'
const { Meta } = Card
import sevenlee_avatar from '../assets/img/band.jpeg'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      articleList: [],
      isLoaded: false,
      loading: false
    }
  }

  componentDidMount() {
    this.getArticleList(true)
  }
  componentDidCatch(error) {
    console.log(error)
  }
  getArticleList(needLoading) {
    if (needLoading) {
      this.setState({isLoaded: true})
    }
    this.setState({loading: true})
    f_Request('/get-article')
      .then(data => {
        this.setState({
          articleList: data.rows.map(item => ({
            ...item,
            star_er: JSON.parse(item.star_er),
            createdAt: new Date(item.createdAt).toLocaleString(),
            updatedAt: new Date(item.updatedAt).toLocaleString()
          })),
          isLoaded: false,
          loading: false
        })
      })
  }
  handleOnGiveOrCancel(id, star, star_er, type, index) {
    if (type === 'cancel') {
      star_er = [...star_er.slice(0, index), ...star_er.slice(index + 1)]
    } else {
      star_er = [...star_er, this.props.user.username]
    }
    
    f_Request('/update-article', { id, fields: { star, star_er: JSON.stringify(star_er) } })
      .then(data => {
        this.getArticleList(false)
      })
  }
  handleOnEdit(id) {
    this.props.history.replace(`/markdown-editor?id=${id}`)
  }
  handleOnEye(id) {
    // window.open(`/detail?id=${id}`)
    this.props.history.push(`/detail?id=${id}`)
  }
  handleOnDelete(id) {
    const { username, code } = this.props.user
    const canDelete = username === 'lidongsevenlee' && code === '930903'
    if (!canDelete) {
      notification.error({
        message: '操作失败',
        description: '你无权执行此操作！'
      })
      return
    }
    f_Request('/del-article', { id })
      .then(data => {
        this.getArticleList(true)
        notification.success({
          message: '删除成功',
          description: `id 为${id}`,
          duration: 2
        })
      })
  }

  render() {
    const { articleList, isLoaded, loading } = this.state
    const { username } = this.props.user
    return (
      <Spin spinning={loading}>
      {
        !articleList.length ? <div className="container" style={{width: '100%', textAlign: 'center', paddingTop: '30px'}}>He didn't do anything！</div> : 
        <div className="container seven">
          {
            articleList.map((item, idx) => (
              <Card 
                style={{breakInside: "avoid", marginTop: idx ? '10px' : 0, boxSizing: 'border-box'}}
                key={item.id}
                loading={isLoaded}
                title={item.title}
                extra={
                  <div style={{fontSize: '12px'}}>
                    <Icon type="clock-circle-o" />&nbsp;{item.createdAt}
                  </div>
                }
                // cover={<img alt="example" src="/sevenlee-public/upload-file/Mirror%20II.jpg" />}
                actions={
                  item.star_er.includes(username) ? 
                  (
                    [
                      <span onClick={this.handleOnGiveOrCancel.bind(this, item.id, item.star - 1, item.star_er, 'cancel', item.star_er.indexOf(username))}>
                        <Icon type="like" style={{color: '#752cd4'}} />&nbsp;{item.star}
                      </span>, 
                      <Icon onClick={this.handleOnEye.bind(this, item.id)} type="eye-o" />,
                      <Icon onClick={this.handleOnEdit.bind(this, item.id)} type="edit" />,
                      <Popconfirm title="确定删除么？" onConfirm={this.handleOnDelete.bind(this, item.id)}>
                        <Icon type="delete" />
                      </Popconfirm>
                    ]
                  )
                  : (
                    [
                      <span onClick={this.handleOnGiveOrCancel.bind(this, item.id, item.star + 1, item.star_er, 'give')}>
                        <Icon type="like-o" />&nbsp;{item.star}
                      </span>, 
                      <Icon onClick={this.handleOnEye.bind(this, item.id)} type="eye-o" />,
                      <Icon onClick={this.handleOnEdit.bind(this, item.id)} type="edit" />,
                      <Popconfirm title="确定删除么？" onConfirm={this.handleOnDelete.bind(this, item.id)}>
                        <Icon type="delete" />
                      </Popconfirm>
                    ]
                  )
                }
              >
                <Meta
                  title={item.title}
                  description={
                    <div>
                      <Icon type="user" /> {item.creator}
                    </div>}
                />
                <p style={{marginTop: '20px'}}>
                  <Icon type="heart" theme="twoTone" style={{color: '#eb2f96'}} />&nbsp;{item.star_er.map((er, idx) => (<span key={idx}>{`${er} `}</span>))}
                </p>
              </Card>
            ))
          }
        </div>
      }
      </Spin>
    )
  }
}

export default Main