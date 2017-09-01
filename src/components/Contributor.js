import React, { Component } from 'react';

class Contributor extends Component {
  render(){
    return(
      <div>
        <span>{this.props.language}:</span><span>{this.props.contributions}</span>
      </div>
    )
  }
}

export default Contributor;
