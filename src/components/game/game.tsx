import * as React from 'react';
import './game.css';

import Play from '../play/play';
import Splash from '../splash/splash';

enum state {
  splash,
  play
}

interface IGameState {
  current: state
}

class Game extends React.Component<{}, IGameState> {

  public readonly state: IGameState = {
    current: state.splash
  }

  private renderers = {
    [state.splash]: () => <Splash onStart={this.handleStart}/>,
    [state.play]: () => <Play />
  };

  public render() {
    return (
      <div className="game">
        {this.renderers[this.state.current]()}
      </div>
    );
  }

  private handleStart = () => {
    this.setState({ current: state.play})
  }
}

export default Game;
