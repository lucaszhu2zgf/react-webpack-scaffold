import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

// using base style of the app
import appCss from './style/app.scss'

import App from './pages/app/app.jsx'
import Home from './pages/home/home.jsx'
import About from './pages/about/about.jsx'
import Inbox from './pages/inbox/inbox.jsx'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/about" component={About}/>
      <Route path="/inbox" component={Inbox}/>
    </Route>
  </Router>
), document.getElementById('app'));
