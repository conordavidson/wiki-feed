import React, { Component } from 'react';

class Wikicontribution extends Component {
  render(){
    return(
      <div className="contribution">
        <div className="contribution-language">{this.props.language}</div>
        <div className="contribution-user">{this.props.user}</div>
        <div className="contribution-article-title">{this.props.title}</div>
      </div>
    )
  }
}

export default Wikicontribution;
