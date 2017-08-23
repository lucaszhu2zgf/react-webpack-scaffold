import React, { Component } from 'react'

import logoImage from '../../images/react-logo.png'

import homeCss from './home.scss'

import httpApi from '../../utils/httpApi.js'

class Home extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  console.log(0)
    httpApi.getUerInfo.then(res => {
      console.log(res);
    }).then(err => {
      console.error(err);
    });
  }

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
