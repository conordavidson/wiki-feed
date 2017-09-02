import React, { Component } from 'react';
import Wikistream from './components/Wikistream'
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
        <header>
          <div className="container">
            <div className="project-info project-title">Wiki<span className='secondary'>Feed</span></div>
            <div className="project-info project-author">Conor Davidson</div>
          </div>
        </header>
        <main>
          <Wikistream />
        </main>
      </div>
    );
  }
}

export default App;
