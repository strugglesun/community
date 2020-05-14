import React from 'react';
import { Link } from 'react-router-dom'
import { EyeOutlined, LikeOutlined } from '@ant-design/icons'
import './list.scss'
import moment from 'moment'
function List(props) {
  return (
    <li className='list'>
      <div className="content-left">
        <Link to={`/use/${props.loginname}`}><img src={props.avatar} alt="" /></Link>
        <Link to={`/topic/${props.id}`}><span>{props.title}</span></Link>
      </div>
      <div className="content-right">
        <span className='title'><EyeOutlined></EyeOutlined> {props.visit_count}</span>
        <span className='title'><LikeOutlined></LikeOutlined> {props.reply_count}</span>
        <span className='title'> {moment(props.last_reply).fromNow()}</span>
      </div>
    </li>
  )
}
export default List;