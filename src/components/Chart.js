import React, { Component } from 'react';
import Rickshaw from 'rickshaw';

class Chart extends Component {

  componentDidMount(){

    let graph = new Rickshaw.Graph( {
      element: document.querySelector('#graph'),
      width: document.getElementById('graph').offsetWidth,
      height: 450,
      renderer: 'area',
      stroke: true,
    	series: new Rickshaw.Series.FixedDuration([{ name: 'English' }], undefined, {
    		timeInterval: 250,
    		maxDataPoints: 25,
    		timeBase: new Date().getTime() / 100
    	})
    });

    window.onresize = () => {
      graph.configure({
        width: document.getElementById('graph').offsetWidth,
      })
      graph.render();
    };

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
      <div id="chart" className="panel">
        <div className="legend-container">
          <div className="panel-subtitle">Legend</div>
          <div id="legend"></div>
        </div>
        <div id="graph" />
      </div>
    )
  }
}

export default Chart
