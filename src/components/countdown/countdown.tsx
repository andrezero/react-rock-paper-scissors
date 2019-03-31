import * as React from 'react';

import './countdown.css';

import move from 'src/constants/move';
import Move from '../move/move';

const UPDATE_INTERVAL = 0.15;

interface ICountdownProps {
  time: number,
  onFinished: () => void;
};

interface ICountdownState {
  active: boolean,
  animate?: boolean,
  move: move,
  pulse: boolean,
  startedAt: number,
  timeLeft: number,
  triggered: boolean
}

class Countdown extends React.Component<ICountdownProps, ICountdownState> {

  public readonly state: ICountdownState = {
    active: true,
    animate: false,
    move: 0,
    pulse: false,
    startedAt: Date.now(),
    timeLeft: 0,
    triggered: false
  }

  private animateTimeout: ReturnType<typeof setTimeout>;
  private updateInterval: ReturnType<typeof setInterval>;

  public componentDidMount() {
    this.animateTimeout = setTimeout(() => this.setState({ animate: true }), 0)
    this.setState({ timeLeft: this.props.time || 3 });
    this.updateInterval = setInterval(() => this.update(), UPDATE_INTERVAL * 1000);
  }

  public componentWillUpdate(nextProps: ICountdownProps, nextState: ICountdownState) {
    if (nextState.triggered && nextState.active) {
      this.props.onFinished();
    }
  }

  public componentWillUnmount () {
    clearTimeout(this.animateTimeout);
    clearInterval(this.updateInterval);
  }

  public deactivate () {
    this.setState({ active: false });
  }

  public render() {
    return (
      <div className={`countdown ${this.classNames()}`}>
        <div className={`player ${this.pulse()}`}>
          <span className="label">{this.state.triggered ? '!': this.state.timeLeft}</span>
        </div>
        <div className="player">
          <Move option={this.state.move} selected={true} />
        </div>
      </div>
    );
  }

  private update = () => {
    this.setState((state) => {
      let m = state.move;
      m++;
      if (m > 2) { m = 0 };
      const delta = (this.props.time - (Date.now() - state.startedAt) / 1000);
      let remaining = Math.ceil(delta);
      const pulse = remaining !== state.timeLeft;
      let triggered = state.triggered;
      if (state.active && remaining <= 0) {
        remaining = 0;
        triggered = true;
      } else if (!state.active) {
        remaining = state.timeLeft
      }
      return { move: m, timeLeft: remaining, pulse, triggered };
    });
  }

  private classNames = () : string  => {
    const animate = this.state.animate ? 'active' : '';
    const disabled = this.state.active ? '' : 'disabled';
    const slow = this.state.triggered ? 'slow' : '';
    return `${animate} ${disabled} ${slow}`;
  }

  private pulse = () : string  => {
    const pulse = this.state.active && this.state.pulse ? 'pulse' : '';
    const slow = this.state.triggered ? 'slow' : '';
    return `${pulse} ${slow}`;
  }
}

export default Countdown;
