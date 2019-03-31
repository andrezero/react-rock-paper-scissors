import * as React from 'react';

import './score-update.css';

const p1Content = { p1: '+1', p2: ':-(', draw: ':-/', slow: ':-|' };
const p2Content = { p1: ':-(', p2: '+1', draw: ':-/', slow: ':-D' };
const p1ClassName = { p1: 'happy', p2: 'sad', draw: 'meh', slow: 'sad' };
const p2ClassName = { p1: 'sad', p2: 'happy', draw: 'meh', slow: 'happy' };

interface IScoreUpdateProps {
  lastRound: string;
};

interface IScoreUpdateState {
  animate: {
    p1: boolean,
    p2: boolean,
    score: boolean
  }
}

class ScoreUpdate extends React.Component<IScoreUpdateProps, IScoreUpdateState> {

  public readonly state: IScoreUpdateState = {
    animate: {
      p1: false,
      p2: false,
      score: false
    }
  }

  private animateTimeouts: Array<ReturnType<typeof setTimeout>> = [];

  public componentDidMount() {
    this.animate('score', 0);
    this.animate('p1', 200);
    this.animate('p2', 200);
  }

  public componentWillUnmount () {
    this.animateTimeouts.forEach(animateTimeout => clearTimeout(animateTimeout));
  }

  public render() {
    return (
      <div className={`score-update ${this.classNames()}`}>
        <div className={`score ${this.p1ClassNames()}`}>{this.p1Content()}</div>
        <div className={`score ${this.p2ClassNames()}`}>{this.p2Content()}</div>
      </div>
    );
  }

  private animate(what: string, time: number) {
    const timeout = setTimeout(() => {
      this.setState((state: IScoreUpdateState) => {
        const animate = { ...state.animate };
        animate[what] = true;
        return { ...state, animate };
      });
    }, Math.random() * time + time);
    this.animateTimeouts.push(timeout);
  }

  private classNames = () : string  => {
    const animate = this.state.animate.score ? 'active' : '';
    return `${animate} ${this.props.lastRound}`;
  }

  private p1Content = () : string  => {
    return p1Content[this.props.lastRound];
  }

  private p1ClassNames = () : string  => {
    const animate = this.state.animate.p1 ? 'active' : '';
    return `${animate} ${p1ClassName[this.props.lastRound]}`;
  }

  private p2Content = () : string  => {
    return p2Content[this.props.lastRound];
  }

  private p2ClassNames = () : string  => {
    const animate = this.state.animate.p2 ? 'active' : '';
    return `${animate} ${p2ClassName[this.props.lastRound]}`;
  }
}

export default ScoreUpdate;


