import React, { Component } from 'react'
import querystring from 'query-string'
import { Icon } from 'antd'

class ArticleDetail extends Component {
  constructor() {
    super()
    this.contentId = new Date().getTime()
    this.state = {
      article: null
    }
  }
  componentDidMount() {
    this._mounted = true
    const { search } = this.props.location
    if (!search ) return
    const o = querystring.parse(search)
    if (o.id && !isNaN(o.id)) {
      f_Request('/get-article', { id: o.id })
        .then(data => {
          const rows = data.rows
          if (!rows.length) return
          this.setState({
            article: data.rows[0],
            contentId: o.id
          })
        })
    }
  }
  componentWillUnmount() {
    this._mounted = false
  }

  
  render() {
    const { article } = this.state
    return !article ? null : (
        <div className="container detail">
            {
                [article].map((item, idx) => (
                    <article key={idx}>
                        <header>
                            <h1>{item.title}</h1>
                            <p style={{marginTop: '30px'}}>{item.creator}</p>
                            <p style={{margin: '10px 0 30px 0'}}><Icon type="clock-circle-o" />&nbsp;{new Date(item.createdAt).toLocaleString()}</p>
                        </header>
                        <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                    </article>
                ))
            }
      </div>
    )
  }
}

export default ArticleDetail