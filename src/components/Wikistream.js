import React, { Component } from 'react';
import Wikievent from './Wikievent';
import Chart from './Chart';
import uuidv4 from 'uuid/v4';

class Wikistream extends Component {
  constructor(props){
    super(props);
    this.state = {
      streamConnected: false,
      events: [],
      counts: {}
    }
    this.initializeStream = this.initializeStream.bind(this);
    this.newEvent = this.newEvent.bind(this);
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
      this.newEvent(JSON.parse(msg.data));
    };
  }

  newEvent(event){
    if (this.filterEvent(event)){
      this.updateCounts(event);
      this.setState({
        events: [event].concat(this.state.events.slice(0,9))
      })
    }
  }

  filterEvent(event){
    return (event.bot === false &&
           (event.type === "edit" || event.type === "new"))
  }

  updateCounts(event){
    let updatedCount = this.state.counts[event.wiki] === undefined ? 1 : this.state.counts[event.wiki] + 1
    let counts = Object.assign({}, this.state.counts, {
      [event.wiki]: updatedCount
    });
    this.setState({
      counts: counts
    })
  }

  refreshCounts(){
    this.setState({
      counts: {}
    })
  }

  render(){
    let eventComponents = null;

    if(this.state.events != null){
        eventComponents = this.state.events.map(event => {
            return ( <Wikievent
                         key={uuidv4()}
                         id={event.id}
                         title={event.title}
                         type={event.type}
                         user={event.user}
                     /> );
      });
    }
    return (
      <div>
        <div id="chart">
          <Chart {...this.state.counts} refreshCounts={this.refreshCounts.bind(this)}/>
        </div>
        <div id="stream">
          {eventComponents}
        </div>
      </div>
    )
  }
}

export default Wikistream;
