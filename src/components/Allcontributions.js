import React, { Component } from 'react';

class Allcontributions extends Component {
  render(){
    return(
      <div id="allcontrbutions" className="half">
        <div className="panel-subtitle">Total Contributions</div>
          <div className="centered">{this.props.allContributions}</div>
      </div>
    )
  }
}

export default Allcontributions;
