import * as enzyme from 'enzyme';
import * as React from 'react';
import Move from './move';

it('renders no label when option not provided', () => {
  const move = enzyme.shallow(<Move/>);
  expect(move.find(".label").text()).toEqual('');
});

it('renders rock when option is 0', () => {
  const move = enzyme.shallow(<Move option={0} />);
  expect(move.find(".label").text()).toEqual('rock');
});

it('renders paper when option is 1', () => {
  const move = enzyme.shallow(<Move option={1} />);
  expect(move.find(".label").text()).toEqual('paper');
});

it('renders scissors when option is 2', () => {
  const move = enzyme.shallow(<Move option={2} />);
  expect(move.find(".label").text()).toEqual('scissors');
});

it('is selected when selected provided', () => {
  const move = enzyme.shallow(<Move option={2} selected={true} />);
  expect(move.hasClass('selected'));
});

// it('throws when the enthusiasm level is negative', () => {
//   expect(() => {
//     enzyme.shallow(<Move name='Daniel' enthusiasmLevel={-1} />);
//   }).toThrow();
// });
