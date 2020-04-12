import { Layout, Menu, Button } from 'antd';
import logo from '../../img/logo.jpg..png'
import React, { Component } from 'react';
import axios from 'axios'
import './header.scss'
import { message } from 'antd'
import { Link, withRouter } from 'react-router-dom'
class HeaderBar extends Component {
  state = {
    token: ' f29071e5-381e-4000-9d14-adfd134c92dc',
    useInfo: null
  }
  componentDidMount() {
    var token = localStorage.getItem('token')
    var author_id = localStorage.getItem('author_id')
    if (token) {
      axios.post('https://www.vue-js.com/api/v1/accesstoken', { accesstoken: token }).then(res => {
        localStorage.setItem('token', token)
        localStorage.setItem('author_id', author_id)


        this.setState({
          useInfo: res.data
        })
      })
    }
  }
  render() {
    const { Header } = Layout;
    const { token, useInfo } = this.state
    return (
      <Layout>
        <Header className="header">
          <Link to='/'><img src={logo} alt="" /></Link>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to='/'>首页</Link></Menu.Item>
            <Menu.Item key="2">热门话题</Menu.Item>
            <Menu.Item key="3">发布话题</Menu.Item>
          </Menu>
          {useInfo ? < div className='login'> <Link to={`/use/${useInfo.loginname}`}><img src={useInfo.avatar_url} alt="" /></Link><span>{useInfo.loginname}</span><Button type="primary" onClick={this.loginOut}>退出</Button></div> :
            <div className='login'><input type="text" value={token} onChange={(event) => {
              this.setState({
                token: event.target.value
              })
            }} />
              <Button type="primary" onClick={this.login}>登录</Button>
            </div>
          }
        </Header>
      </Layout>

    );
  }
  login = () => {
    const { token } = this.state
    if (token.trim()) {
      axios.post('https://www.vue-js.com/api/v1/accesstoken', { accesstoken: token }).then(res => {
        localStorage.setItem('token', token)
        localStorage.setItem('author_id', res.data.id)
        console.log(res.data)
        this.setState({
          useInfo: res.data
        })
        this.props.history.push('/')
      }).catch(() => {
        message.info('登录失败，密码错误')
      })
    }
  }
  loginOut = () => {
    localStorage.clear()
    this.setState({
      useInfo: ''
    })
    this.props.history.push('/')
  }
}

export default withRouter(HeaderBar);