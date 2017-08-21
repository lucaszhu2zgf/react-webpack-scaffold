import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './pages/home/home.jsx'
// import About from './pages/about/about.jsx'
// import Inbox from './pages/inbox/inbox.jsx'
// console.log(1,hashHistory)

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route path="/" component={Home}/>
    </div>
  </BrowserRouter>
), document.getElementById('app'));
