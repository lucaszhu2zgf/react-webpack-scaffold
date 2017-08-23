import React, { Component } from 'react'

// using inline style in component
const titleStyle = {
  color: 'blue',
  fontSize: '30px'
};

class About extends Component{
  render() {
    return (
      <div>
        <h2 style={titleStyle}>this is about page</h2>
      </div>
    )
  }
};

export default About;
