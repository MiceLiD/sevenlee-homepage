import React, { Component } from 'react'
import { Icon, Popconfirm, Card, Avatar, notification, Spin, Tabs } from 'antd'
const { Meta } = Card
const { TabPane } = Tabs
import sevenlee_avatar from '../assets/img/band.jpeg'

class Main extends Component {
  constructor() {
    super()
    this.state = {
      articleList: [],
      isLoaded: false,
      loading: false,
      activeKey: "1",
      activeId: 0
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
    console.log(id)
    this.setState({
      activeKey: "2",
      activeId: id
    })
  }
  handleOnBack() {
    this.setState({
      activeKey: "1"
    })
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
    const { articleList, isLoaded, loading, activeKey, activeId } = this.state
    const { username } = this.props.user
    return (
      <div className="seven-panel" style={{height: '100%', marginTop: '-60px'}}>
        <Spin spinning={loading}>
          <Tabs
            defaultActiveKey="1"
            activeKey={ activeKey }>
            <TabPane tab="Tab 1" key="1">
              <div className="container seven">
                {
                  !articleList.length ? <div style={{width: '100%', textAlign: 'center', paddingTop: '30px'}}>He didn't do anything！</div> : 
                  articleList.map((item, idx) => (
                    <Card 
                      style={{breakInside: "avoid", marginTop: idx ? '10px' : 0, boxSizing: 'border-box'}}
                      key={item.id}
                      loading={isLoaded}
                      title={<Avatar src={sevenlee_avatar} />}
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
                              <Icon type="like" />&nbsp;{item.star}
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
                        title=''
                        description={item.title}
                      />
                      <p style={{marginTop: '20px'}}>
                        <Icon type="heart-o" />&nbsp;{item.star_er.map((er, idx) => (<span key={idx}>{`${er} `}</span>))}
                      </p>
                    </Card>
                  ))
                }
              </div>
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              <div className="container detail">
                <span className="back-btn" onClick={this.handleOnBack.bind(this)}>
                  <Icon type="rollback" />
                </span>
                {
                  articleList.filter(_item => _item.id === activeId).map((item, idx) => (
                    <article key={idx}>
                      <header>
                        <h1>{item.title}</h1>
                        <p style={{marginTop: '30px'}}>{username}</p>
                        <p style={{margin: '10px 0 30px 0'}}><Icon type="clock-circle-o" />&nbsp;{item.createdAt}</p>
                      </header>
                      <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                    </article>
                  ))
                }
              </div>
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    )
  }
}

export default Main