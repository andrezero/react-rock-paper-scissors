import * as React from 'react';

import './App.css';

import Game from './components/game/game';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1 className="app-title">Rock Paper Scissors</h1>
          </div>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
