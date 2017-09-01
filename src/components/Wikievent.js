import React, { Component } from 'react';

class Wikievent extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      type: this.props.type,
      user: this.props.user
    }
  }
  render(){
    return(
      <p>
        <span>{this.state.title}</span>
      </p>
    )
  }
}

export default Wikievent;
