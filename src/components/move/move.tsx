import * as cx from 'classnames';
import * as React from 'react';

import './move.css';

import move from '../../constants/move'
import rock from '../../icons/svg/001-brick.svg';
import paper from '../../icons/svg/002-paper.svg';
import scissors from '../../icons/svg/003-scissors.svg';

const icons = [rock, paper, scissors];

interface IMoveProps {
  /**
   * Value to display, one of [0, 1, 2]
   * @default ""
   */
  option?: move;
  /**
   * Show selected highlight
   * @default "false"
   */
  selected?: boolean
};

/**
 * Displays a move `option` with optional `selected` state.
 */
export class Move extends React.Component<IMoveProps> {
  public render() {
    return (
      <div className={`move ${this.classNames()}`}>
        <span className="label">{this.optionName()}</span>
        <img src={this.icon()} />
      </div>
    );
  }

  private optionName = (): string => {
    if (this.props.option !== undefined) {
      return move[this.props.option]
    } else {
      return ''
    }
  }

  private classNames = (): string  => {
    return cx({
      ['move-' + this.optionName()] : true,
      'selected': this.props.selected
    });
  }

  private icon = (): any  => {
    if (this.props.option !== undefined) {
      return icons[this.props.option];
    }
  }
}

export default Move;
