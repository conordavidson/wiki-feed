import React, { Component } from 'react';
import Contributor from './Contributor'

class Contributors extends Component {

  sortContributions(contributions){
    return Object.keys(contributions).sort(function(a, b){
      return contributions[b] - contributions[a]
    })
  }

  render(){
    let topContributorComponents = null;

    topContributorComponents = this.sortContributions(this.props).slice(0, 5).map(contribution => {
      return <Contributor key={contribution} language={contribution} contributions={this.props[contribution]} />
    })

    return(
      <div id="topcontributors" className="panel">
        <div className="panel-title">Top Contributors</div>
          {topContributorComponents}
      </div>
    )
  }
}

export default Contributors;
