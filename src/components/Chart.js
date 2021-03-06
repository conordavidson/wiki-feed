import React, { Component } from 'react';
import Rickshaw from 'rickshaw';

class Chart extends Component {

  componentDidMount(){

    let pallete = new Rickshaw.Color.Palette({scheme: "classic9"});

    let graph = new Rickshaw.Graph( {
      element: document.querySelector('#graph'),
      width: document.getElementById('graph').offsetWidth,
      height: 450,
      renderer: 'area',
      interpolation: 'basis',
      unstack: 'true',
      stroke: true,
    	series: new Rickshaw.Series.FixedDuration([{ name: 'English' }], pallete, {
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

    let graphData = () => {
      let data = [];
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

    setInterval(() => graphData(), 1000);
  }

  render(){
    return(
      <div className="right panel">
        <div className="legend-title panel-subtitle">Legend</div>
        <div className="legend-container">
          <div id="legend"></div>
        </div>
        <div id="graph" />
      </div>
    )
  }
}

export default Chart
