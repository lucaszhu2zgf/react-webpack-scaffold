import React, {Component} from 'react'
import { Link } from 'react-router'

class App extends Component{
  render() {
    return (
      <div>
        <Link to="/">home</Link><br/>
        <Link to="/about">abouts</Link><br/>
        <Link to="/inbox">inbox</Link>
        {this.props.children}
      </div>
    )
  }
};

export default App;
