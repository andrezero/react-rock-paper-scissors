import * as React from 'react';

import './score-board.css';

interface IScoreBoardProps {
  p1: number,
  p2: number
};

class ScoreBoard extends React.Component<IScoreBoardProps> {
  public render() {
    return (
      <div className="score-board">
        <div className="score">
          <strong className="name">player one</strong>
          <span className="value">{this.props.p1}</span>
        </div>
        <div className="score">
          <strong className="name">computer</strong>
          <span className="value">{this.props.p2}</span>
        </div>
      </div>
    );
  }
}

export default ScoreBoard;



