import React, { Component } from 'react';

class Contributor extends Component {
  render(){
    return(
      <div className="contributor">
        <div className="contributor-language">{this.props.language}</div>
        <div className="contributor-contributions">{this.props.contributions}</div>
      </div>
    )
  }
}

export default Contributor;
