import * as React from 'react';

import './move-options.css';

import move from '../../constants/move'
import { Move } from '../move/move';

interface IMoveOptionsProps {
  enabled: boolean
  onChoice: (choice: move) => void
}

interface IMoveOptionsState {
  selection?: move
}

class MoveOptions extends React.Component<IMoveOptionsProps, IMoveOptionsState> {
  public readonly state: IMoveOptionsState = {
    selection: undefined
  }

  public render() {
    return (
      <div className={`move-options ${this.classNames()}`}>
        {Object.keys(move).filter(item => isNaN(Number(item))).map((option, index) => {
          return (
            <div className="option" key={index} onClick={this.handleClick.bind(this, index)}>
              <Move option={index} selected={index === this.state.selection}/>
            </div>
          )
        })}
      </div>
    );
  }

  public reset () {
    this.state.selection = undefined;
  }

  private classNames = () : string  => {
    return this.props.enabled ? 'enabled' : '';
  }

  private handleClick = (index: number) => {
    if (!this.props.enabled) {
      return;
    }
    this.setState({ selection: index})
    this.props.onChoice(index)
  }
}

export default MoveOptions;
