import React, { Component } from 'react';
import List from '../List/List'
import './home.scss'
import { NavLink } from 'react-router-dom'
import { Layout, Menu, Skeleton, Pagination } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import axios from 'axios';
class Home extends Component {
  state = {
    topic: []
  }
  componentDidMount() {
    this.getTypes()

  }
  componentDidUpdate(preprops) {
    const oldsearch = preprops.location.search
    const { search } = this.props.location
    if (search !== oldsearch) {
      const type = search.replace('?tab=', '')
      this.getTypes(type)
    }

  }
  render() {
    const { search } = this.props.location
    const { SubMenu } = Menu;
    const { Content, Sider } = Layout;
    const { topic } = this.state
    const paginaArr = [{ type: 'all', allNumber: 1018 },
    { type: 'good', allNumber: 15 },
    { type: 'weex', allNumber: 3 },
    { type: 'share', allNumber: 372 },
    { type: 'ask', allNumber: 624 },
    { type: 'job', allNumber: 59 }]
    const number = paginaArr.find(item => search === '' ? item.type === 'all' : search.indexOf(item.type) > -1).allNumber
    return (

      <div className="Home">
        <Content style={{ padding: '0 15%', background: '#ccc' }}>
          <Layout className="site-layout-background" >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', padding: '24px 0' }}
              > <Menu.Item key="1"><NavLink to='/?tab=all'><span>
                <UserOutlined />

              </span>全部</NavLink></Menu.Item>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <LaptopOutlined />
                  类别
                </span>
                  }
                >
                  <Menu.Item key="5"><NavLink to='/?tab=good'>精华</NavLink></Menu.Item>
                  <Menu.Item key="6"><NavLink to='/?tab=weex'>weex</NavLink></Menu.Item>
                  <Menu.Item key="7"><NavLink to='/?tab=share'>分享</NavLink></Menu.Item>
                  <Menu.Item key="8"><NavLink to='/?tab=ask'>问答</NavLink></Menu.Item>
                  <Menu.Item key="9"><NavLink to='/?tab=job'>招聘</NavLink></Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <NotificationOutlined />
                  论坛
                </span>
                  }
                >
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '24px', minHeight: 280, background: '#fff' }}>
              {topic.length ? <div><ul style={{ padding: 0 }}>{
                topic.map(item => <List last_reply={item.last_reply_at} loginname={item.author.loginname} id={item.id} avatar={item.author.avatar_url} title={item.title}
                  visit_count={item.visit_count} reply_count={item.reply_count} key={item.id}></List>)
              }</ul> <Pagination defaultCurrent={1} total={number} pageSize={20} onChange={this.changePage} /></div> : <Skeleton active />}

            </Content>
          </Layout>
        </Content>
      </div>
    );
  }
  getTypes = (type = 'all', page = 1, limit = 20) => {
    axios.get(`https://www.vue-js.com/api/v1/topics?tab=${type}&page=${page}&limit=${limit}`).then(res => {
      console.log(res.data.data);
      this.setState({
        topic: res.data.data

      })
    }
    )
  }
  changePage = (page) => {
    const { search } = this.props.location
    const type = search.replace('?tab=', '')
    this.getTypes(type, page)
  }
}

export default Home;