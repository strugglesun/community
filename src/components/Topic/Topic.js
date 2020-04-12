import React, { Component } from 'react';
import { Skeleton } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { LikeOutlined, ExportOutlined } from '@ant-design/icons'
import axios from 'axios'
import './topic.scss'
class Topic extends Component {
  state = {
    topic: null
  }
  componentDidMount() {
    const { topicid } = this.props.match.params
    axios.get(`https://www.vue-js.com/api/v1/topic/${topicid}`).then(res => {
      console.log(res.data.data)
      this.setState({
        topic: res.data.data
      })
    })
  }
  render() {
    const token = localStorage.getItem('token')
    const author_id = localStorage.getItem('author_id')
    const { topic } = this.state
    return topic ? <div className='topic'>
      <div className='topic-header'>
        <h3>{topic.title}</h3>
        <span>•发布于 {moment(topic.create_at).fromNow()}</span>
        <span>•作者 {topic.author.loginname}</span>
        <span>•{topic.visit_count}次浏览</span>
      </div>
      <div className="topic-content" dangerouslySetInnerHTML={{ __html: topic.content }}></div>
      <div className="commit-box">
        <ul>
          {topic.replies.map(item =>
            <li key={item.id}>
              <div><Link to={`/use/${item.author.loginname}`}><img src={item.author.avatar_url} alt="" /></Link>
                <span>{item.author.loginname}</span>
                <span>{moment(item.create_at).fromNow()}</span>
                <div dangerouslySetInnerHTML={{ __html: item.content }}></div></div>
              <div><span style={{ color: item.ups.includes(author_id) ? 'blue' : '#ccc' }}><LikeOutlined /></span><span>{item.ups.length}</span>{token ? <span><ExportOutlined /></span> : ""}</div>
            </li>
          )}
        </ul>
      </div>
    </div > : <Skeleton active />
  }
}

export default Topic;