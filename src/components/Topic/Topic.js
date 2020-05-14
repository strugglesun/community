import React, { Component } from 'react';
import { Skeleton, message, Tooltip, Button, Input } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { LikeOutlined, ExportOutlined } from '@ant-design/icons'
import axios from 'axios'
import E from 'wangeditor'
import './topic.scss'
class Topic extends Component {
  state = {
    topic: null,
    commit: '',
    textareaValue: ''
  }
  componentDidMount() {
    const { topicid } = this.props.match.params
    axios.get(`https://www.vue-js.com/api/v1/topic/${topicid}`).then(res => {
      console.log(res.data.data)
      this.setState({
        topic: res.data.data
      })
      this.myEditor = new E(document.querySelector('#editor'))
      this.myEditor.customConfig.onchange = (html) => {
        this.setState({
          commit: html
        })
      }
      this.myEditor.create()
    })
  }
  render() {
    const { TextArea } = Input;
    const token = localStorage.getItem('token')
    const author_id = localStorage.getItem('author_id')
    const { topic, textareaValue } = this.state
    return topic ? <div className='topic'>
      <div className='topic-header'>
        <h3>{topic.title}</h3>
        <span className='active'><span>•</span>发布于 {moment(topic.create_at).fromNow()}</span>
        <span className='active'><span>•</span>作者 {topic.author.loginname}</span>
        <span className='active'><span>•</span>{topic.visit_count}次浏览</span>
      </div>
      <div className="topic-content" dangerouslySetInnerHTML={{ __html: topic.content }}></div>
      <div className="commit-box">
        <ul>
          {topic.replies.map(item =>
            <li key={item.id}>
              <div className='commit-box-top'>
                <div>
                  <Link to={`/use/${item.author.loginname}`}><img src={item.author.avatar_url} alt="" /></Link>
                  <span>{item.author.loginname}</span>
                  <span>{moment(item.create_at).fromNow()}</span>
                  <div dangerouslySetInnerHTML={{ __html: item.content }} className='commit-content'></div>
                </div>
                <div>
                  <span style={{ color: item.ups.includes(author_id) ? 'blue' : '#ccc' }}><LikeOutlined onClick={() => { this.upClick(item.id) }} /></span>
                  <span>{item.ups.length}</span>
                  {
                    token ? <Tooltip placement="topLeft" title="回复">
                      <span onClick={() => { this.handlerReply(item) }}><ExportOutlined /></span>
                    </Tooltip> : ""
                  }
                </div>
              </div>
              {
                item.showTextarea ? <div className="commit-box-footer"><TextArea rows={4} value={textareaValue} onChange={event => {
                  this.setState({
                    textareaValue: event.target.value
                  })
                }} />
                </div> : ''
              }
            </li>
          )}
        </ul>
        <div className="commit-footer">
          <h3>添加回复</h3>
          <div id="editor"></div>
          <Button type='primary' onClick={this.addCommit}>回复</Button>
        </div>
      </div>
    </div > : <Skeleton active />
  }
  upClick = (reply_id) => {
    // post /reply/:reply_id/ups 为评论点赞
    const token = localStorage.getItem('token')
    const newTopic = { ...this.state.topic }
    const author_id = localStorage.getItem('author_id')
    if (token) {
      axios.post(`https://www.vue-js.com/api/v1/reply/${reply_id}/ups`, { accesstoken: token }).then(res => {
        const currentReply = newTopic.replies.find(item => item.id === reply_id)
        if (res.data.action === 'up') {
          console.log(author_id)
          currentReply.ups.push(author_id)

        } else {
          currentReply.ups = currentReply.ups.filter(item => item !== author_id)
        }
        this.setState({
          topic: newTopic
        })
      })
    } else {
      message.warning('请先登录')
    }
  }
  addCommit = () => {
    const { commit } = this.state
    const { topicid } = this.props.match.params
    if (commit.trim()) {
      const token = localStorage.getItem('token')
      axios.post(`https://www.vue-js.com/api/v1/topic/${topicid}/replies`,
        { accesstoken: token, content: commit }).then(() => {
          axios.get(`https://www.vue-js.com/api/v1/topic/${topicid}`).then(res => {
            this.setState({
              topic: res.data.data
            })
          })
          this.myEditor.txt.clear()
        })
    } else {
      message.info('请输入有效内容')
    }
  }
  handlerReply = ({ id, author }) => {
    const { topic } = this.state
    const newTopic = { ...topic }
    newTopic.replies.forEach(item => {
      if (item.id === id) {
        item.showTextarea = !item.showTextarea
      } else {
        item.showTextarea = false
      }
    })
    console.log(newTopic)
    this.setState({
      topic: newTopic,
      textareaValue: `@${author.loginname}  `
    })
  }
}

export default Topic;