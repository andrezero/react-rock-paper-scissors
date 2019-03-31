import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import MoveOptions from '../src/components/move-options/move-options';

storiesOf('MoveOptions', module)
  .addDecorator(withInfo)
  .addParameters({ info: { inline: true } })
  .add('options', () => <MoveOptions enabled={false} onChoice={action('onChoice')} />)
  .add('options (enabled)', () => <MoveOptions enabled={true} onChoice={action('onChoice')} />);
