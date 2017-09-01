import React, { Component } from 'react';
import Rickshaw from 'rickshaw';

class Chart extends Component {

  componentDidMount(){

    let graph = new Rickshaw.Graph( {
      element: document.querySelector('#graph'),
      width: 600,
      height: 400,
      renderer: 'area',
      stroke: true,
    	series: new Rickshaw.Series.FixedDuration([{ name: 'enwiki' }], undefined, {
    		timeInterval: 250,
    		maxDataPoints: 25,
    		timeBase: new Date().getTime() / 100
    	})
    });

    graph.renderer.unstack = true;

    let hoverDetail = new Rickshaw.Graph.HoverDetail( {
      	graph: graph,
      	xFormatter: function(x) {
      		return new Date(x * 1000).toString();
      	}
    });

    var legend = new Rickshaw.Graph.Legend( {
	      graph: graph,
	      element: document.getElementById('legend')
    });

    this.interval = setInterval(() => this.graphData(graph, legend), 1000);
  }

  graphData(graph, legend){

    let data = {};

    for(let k in this.props) {
      if(this.props.hasOwnProperty(k)) {
        if(k !== 'refreshCounts'){
          data[k] = this.props[k]
        }
      }
    }

  	graph.series.addData(data);
  	graph.render();
    legend.render();

    this.props.refreshCounts();
  }

  render(){
    return(
      <div>
        <div id="legend" />
        <div id="graph" />
      </div>
    )
  }
}

export default Chart
