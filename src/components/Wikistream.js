import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import Wikicontribution from './Wikicontribution';
import Contributors from './Contributors'
import Allcontributions from './Allcontributions'
import Chart from './Chart';
import Wikilanguages from '../data/wikilanguages.json';

class Wikistream extends Component {
  constructor(props){
    super(props);
    this.state = {
      streamConnected: false,
      contributions: [],
      contributionsPerSecond: {},
      totalContributions: {},
      allContributions: 0
    }
    this.initializeStream = this.initializeStream.bind(this);
    this.newContribution = this.newContribution.bind(this);
    this.updateCounts = this.updateCounts.bind(this);
  }

  componentWillMount(){
    this.initializeStream();
  }

  initializeStream(){
    var stream = new EventSource("https://stream.wikimedia.org/v2/stream/recentchange");
    stream.onopen = () => {
      this.setState({
        streamConnected: true
      })
    };
    stream.onmessage = msg => {
      this.newContribution(JSON.parse(msg.data));
    };
  }

  newContribution(contribution){
    if (this.filterContribution(contribution)){
      let updatedContribution = this.attachLanguage(contribution);
      if(updatedContribution){
        this.updateCounts(updatedContribution);
      }
    }
  }

  filterContribution(contribution){
    return (contribution.bot === false &&
           (contribution.type === "edit" || contribution.type === "new"))
  }

  attachLanguage(contribution){
    let language = contribution.wiki.split("wik")[0]
    if (Wikilanguages[language]){
      contribution.language = Wikilanguages[language]
      return contribution;
    }
    return false;
  }

  updateCounts(contribution){
    let updatedContributionsPerSecond = this.state.contributionsPerSecond[contribution.language] === undefined ? 1 : this.state.contributionsPerSecond[contribution.language] + 1
    let updatedTotalContributions = this.state.totalContributions[contribution.language] === undefined ? 1 : this.state.totalContributions[contribution.language] + 1

    let contributionsPerSecond = Object.assign({}, this.state.contributionsPerSecond, {[contribution.language]: updatedContributionsPerSecond});
    let totalContributions = Object.assign({}, this.state.totalContributions, {[contribution.language]: updatedTotalContributions});
    let allContributions = this.state.allContributions + 1;

    this.setState({
      contributionsPerSecond: contributionsPerSecond,
      totalContributions: totalContributions,
      contributions: [contribution].concat(this.state.contributions.slice(0, 4)),
      allContributions: allContributions
    })
  }

  refreshCounts(){
    this.setState({
      contributionsPerSecond: {}
    })
  }

  render(){
    let contributionComponents = null;

    if(this.state.contributions != null){
        contributionComponents = this.state.contributions.map(contribution => {
            return ( <Wikicontribution
                         key={uuidv4()}
                         language={contribution.language}
                         title={contribution.title}
                         type={contribution.type}
                         user={contribution.user}
                     /> );
      });
    }
    return (
      <div className="container flex-row">
        <div className="left flex-col">
          <div id="contributions" className="panel">
              <Contributors {...this.state.totalContributions} />
              <Allcontributions allContributions={this.state.allContributions} />
          </div>
          <div id="stream" className="panel-flex-height panel">
            <div className="panel-subtitle">Contribution Stream</div>
            {contributionComponents}
          </div>
        </div>
        <Chart {...this.state.contributionsPerSecond} refreshCounts={this.refreshCounts.bind(this)} />
      </div>
    )
  }
}

export default Wikistream;
