import React, { Component } from 'react';
import Contributor from './Contributor'

class Contributors extends Component {

  sortContributions(contributions){
    return Object.keys(contributions).sort((a, b) => {
      return contributions[b] - contributions[a]
    })
  }

  render(){
    let topContributorComponents = null;

    topContributorComponents = this.sortContributions(this.props).slice(0, 5).map((contribution, index) => {
      return <Contributor key={contribution} index={index+1} language={contribution} contributions={this.props[contribution]} />
    })

    return(
        <div id="topcontributors" className="half">
          <div className="panel-subtitle">Top Contributors</div>
            {topContributorComponents}
        </div>
    )
  }
}

export default Contributors;
