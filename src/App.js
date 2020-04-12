import React from 'react';
import moment from 'moment'
import 'moment/locale/zh-cn'
import HeaderBar from './components/Header/Header';
import Main from './components/Main/Main';
import { HashRouter as Router } from 'react-router-dom'
function App() {
  moment.locale('zh_cn')
  return (
    <div>
      <Router>
        <HeaderBar />
        <Main />
      </Router>
    </div>
  );
}

export default App;
