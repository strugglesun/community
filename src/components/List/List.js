import React from 'react';
import { Link } from 'react-router-dom'
import './list.scss'
import moment from 'moment'
function List(props) {
  return (
    <li className='list'>
      <Link to={`/use/${props.loginname}`}><img src={props.avatar} alt="" /></Link>
      <Link to={`/topic/${props.id}`}><span>{props.title}</span></Link>
      <span style={{ float: 'right' }}>      {moment(props.last_reply).fromNow()}
      </span>
    </li>
  )
}
export default List;