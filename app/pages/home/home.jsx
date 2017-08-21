import React, {Component} from 'react'

class Home extends Component{
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li>asdfafd</li>
          <li>h42wressdddd</li>
        </ul>
        {this.props.children}
      </div>
    )
  }
};

export default Home;
