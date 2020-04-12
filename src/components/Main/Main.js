import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../Home/Home'
import Topic from '../Topic/Topic'
import Use from '../Use/Use'
const Main = (props) => {
  return <>
    <Route exact path='/' component={Home}></Route>
    <Route path='/topic/:topicid' component={Topic}></Route>
    <Route path='/use/:useid' component={Use}></Route>
  </>
}
export default Main