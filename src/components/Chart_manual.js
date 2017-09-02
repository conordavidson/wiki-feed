import React, { Component } from 'react';
import Rickshaw from 'rickshaw';

class Chart extends Component {

  componentDidMount(){

    let returnSeriesData = [{}]
    let seriesData = {}
    let addedLanguages = []
    let pallete = new Rickshaw.Color.Palette({scheme: "classic9"});
    const maxDataPoints = 25;

    let graphData = () => {
      for(let k in this.props) {
        if(this.props.hasOwnProperty(k)) {
          if(k !== 'refreshCounts' && !addedLanguages.includes(k)){
            addedLanguages.push(k)
          }
        }
      }

      addedLanguages.map(language => {
        seriesData[language] = {
          name: language,
          data: constructDataArray(seriesData[language] || false, this.props[language] || false),
          color: 'lightblue',
        }
      })

      function constructDataArray(pastData, newData){
        if(pastData){
          let arr = pastData.data.slice(1).map((coords, index) => {
            return {x: index, y: coords.y}
          })
          if(newData){
            arr.push({x: maxDataPoints, y: newData})
          }
          else{
            arr.push({x: maxDataPoints, y: 0})
          }
          return arr;
        }
        else{
          return newDataSet(newData);
        }
      }

      function newDataSet(data){
        let arr = [];
        for(let i = 0; i < maxDataPoints - 1; i++){
          arr.push({x:i, y:0})
        }
        arr.push({x: maxDataPoints, y: data})
        return arr;
      }

      returnSeriesData = addedLanguages.map(language => {
        return seriesData[language]
      })

      if(graph){
        returnSeriesData.map(item => graph.series.addData(item))
        graph.render();
        legend.render();
        this.props.refreshCounts();
        console.log(graph, returnSeriesData)
      }
    }

    graphData();

    let graph = new Rickshaw.Graph( {
      element: document.querySelector('#graph'),
      width: document.getElementById('graph').offsetWidth,
      height: 450,
      renderer: 'area',
      interpolation: 'basis',
      unstack: true,
      preserve: true,
      stroke: true,
      series: new Rickshaw.Series()
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
