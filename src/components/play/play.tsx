import * as React from 'react';
import './play.css';

import move from '../../constants/move'

import Countdown from '../countdown/countdown';
import CurrentMoves from '../current-moves/current-moves';
import MoveOptions from '../move-options/move-options';
import ScoreBoard from '../score-board/score-board';
import ScoreUpdate from '../score-update/score-update';

const CHOOSING_TIME = 2;
const CHOSEN_TIME = 1;
const MATCHED_TIME = 2;
const SCORING_TIME = 1.5;

enum state {
  choosing,
  chosen,
  matched,
  scoring
}

const stateClassName = {
  [state.choosing]: 'choosing',
  [state.chosen]: 'chosen',
  [state.matched]:'matched',
  [state.scoring]:'scoring'
}

interface IPlayState {
  current: state,
  lastRound: string,
  moves: {
    p1?: move,
    p2?: move
  }
  score: {
    p1: number,
    p2: number
  },
}

class Play extends React.Component<{}, IPlayState> {
  public readonly state: IPlayState = {
    current: state.choosing,
    lastRound: 'none',
    moves: {},
    score: {
      p1: 0,
      p2: 0
    },
  }

  private nextState: ReturnType<typeof setTimeout>;
  private countdown = React.createRef<Countdown>();
  private moveOptions = React.createRef<MoveOptions>();
  private advanceState?: () => void;

  public componentWillUnmount () {
    clearTimeout(this.nextState);
  }

  public render() {
    return (
      <div className={`play container ${this.classNames()}`}>
        <ScoreBoard p1={this.state.score.p1} p2={this.state.score.p2} />
        {this.isCurrently([state.choosing, state.chosen]) &&
          <Countdown time={CHOOSING_TIME} onFinished={this.handleCountdownFinished} ref={this.countdown} />
        }
        {this.isCurrently([state.matched]) &&
          <CurrentMoves p1={this.state.moves.p1} p2={this.state.moves.p2}/>
        }
        {this.isCurrently([state.scoring]) &&
          <ScoreUpdate lastRound={this.state.lastRound}/>
        }
        <MoveOptions onChoice={this.handleChoice} enabled={this.state.current === state.choosing} ref={this.moveOptions}/>
      </div>
    );
  }

  private classNames() : string  {
    return stateClassName[this.state.current];
  }

  private isCurrently (states: state[]): boolean {
    return states.indexOf(this.state.current) !== -1
  }

  private setCurrent(current: state) {
    this.setState({ current });
  }

  private next(fn?: () => void, seconds?: number) {
    clearTimeout(this.nextState);
    if (fn) {
      this.advanceState = fn;
      this.nextState = setTimeout(fn, (seconds || 1) * 1000);
    } else if (this.advanceState) {
      this.advanceState();
      this.advanceState = undefined;
    }
  }

  private resetOptions() {
    if (this.moveOptions.current) {
      this.moveOptions.current.reset();
    }
  }

  private updateP1Move(newMove?: move) {
    this.setState((s: IPlayState) => {
      const p2 = s.moves.p2;
      return { moves: { p1: newMove, p2 }};
    });
  }

  private updateP2Move(newMove?: move) {
    this.setState((s: IPlayState) => {
      const p1 = s.moves.p1;
      return { moves: { p1, p2: newMove }};
    });
  }

  private updateP1Scored() {
    this.setState((s: IPlayState) => {
      const p1 = s.score.p1 + 1;
      const p2 = s.score.p2;
      return { score: { p1, p2 }, lastRound: 'p1' };
    });
  }

  private updateP2Scored() {
    this.setState((s: IPlayState) => {
      const p1 = s.score.p1;
      const p2 = s.score.p2 + 1;
      return { score: { p1, p2 }, lastRound: 'p2' };
    });
  }

  private updateRoundDraw() {
    this.setState({ lastRound: 'draw' });
  }

  private updateRoundTimedOut() {
    this.setState({ lastRound: 'slow' });
  }

  private p2choice(): move {
    const rand = Math.floor(Math.random() * 3);
    const key = move[rand]
    return move[key];
  }

  private handleCountdownFinished = () => {
    if (this.state.current === state.choosing) {
      this.handleChoice();
    }
  }

  private handleChoice = (p1move?: move) => {
    if (this.countdown.current) {
      this.countdown.current.deactivate();
    }
    this.setCurrent(state.chosen)
    this.next(() => {
      this.showOutcome(p1move)
    }, CHOSEN_TIME);
  }

  private score(p2move: move, p1move?: move) {
    if (p1move === undefined) {
      this.updateP2Scored();
      this.updateRoundTimedOut();
    } else if (p1move === p2move) {
      this.updateRoundDraw();
    } else if (p1move === 0 && p2move === 2) {
      this.updateP1Scored();
    } else if (p1move === p2move + 1) {
      this.updateP1Scored();
    } else {
      this.updateP2Scored();
    }
  }

  private showOutcome(p1move?: move) {
    this.resetOptions();
    this.updateP1Move(p1move);
    const p2move = this.p2choice();
    this.updateP2Move(p2move);
    this.setCurrent(state.matched)
    this.next(() => this.updateScore(p2move, p1move), MATCHED_TIME);
  }

  private updateScore(p2move: move, p1move?: move) {
    this.score(p2move, p1move);
    this.setCurrent(state.scoring)
    this.next(() => this.nextPlay(), SCORING_TIME);
  }

  private nextPlay() {
    this.setCurrent(state.choosing)
  }
}

export default Play;
