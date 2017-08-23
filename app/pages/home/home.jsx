import React, {Component} from 'react'

import logoImage from '../../images/react-logo.png'

import homeCss from './home.scss'

class Home extends Component{
  render() {
    return (
      <div>
        <h1 className="warn">this is home page</h1>
        <img src={logoImage}/>
      </div>
    )
  }
};

export default Home;
