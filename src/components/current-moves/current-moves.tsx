import * as React from 'react';

import './current-moves.css';

import move from '../../constants/move'

import Move from '../move/move';

interface ICurrentMovesProps {
  p1?: move;
  p2?: move;
};

interface ICurrentMovesState {
  animate?: boolean
}

class CurrentMoves extends React.Component<ICurrentMovesProps, ICurrentMovesState> {

  public readonly state: ICurrentMovesState = {
    animate: false
  }

  private animateTimeout: ReturnType<typeof setTimeout>;

  public componentDidMount() {
    this.animateTimeout = setTimeout(() => this.setState({ animate: true }), 0);
  }

  public componentWillUnmount () {
    clearTimeout(this.animateTimeout);
  }

  public render() {
    return (
      <div className={`current-moves ${this.classNames()}`}>
        <Move option={this.props.p1} selected={true} />
        <Move option={this.props.p2} selected={true} />
      </div>
    );
  }

  private classNames = () : string  => {
    return this.state.animate ? 'active' : '';
  }
}

export default CurrentMoves;


