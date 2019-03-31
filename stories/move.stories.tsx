import { withInfo } from '@storybook/addon-info';
import * as React from 'react';

import { storiesOf } from '@storybook/react';

import { Move } from '../src/components/move/move'

const divStyle = {
  width: '200px'
};

function contained (props: any) {
  return (
    <div style={divStyle}>
      <Move {...props} />
    </div>
  )
}

storiesOf('Move', module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true, header: true } })
  .add('rock', () => contained({ option: 0, selected: false}))
  .add('paper', () => contained({ option: 1, selected: false}))
  .add('scissors', () => contained({ option: 2, selected: false}))
  .add('rock (selected)', () => contained({ option: 0, selected: true}))
  .add('paper (selected)', () => contained({ option: 1, selected: true}))
  .add('scissors (selected)', () => contained({ option: 2, selected: true}));
