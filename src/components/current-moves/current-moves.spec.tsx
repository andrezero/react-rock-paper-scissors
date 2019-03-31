import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import * as enzyme from 'enzyme';
import * as React from 'react';

chai.use(chaiEnzyme());
const expect = chai.expect;

import Move from '../move/move';
import CurrentMoves from './current-moves';

it('has class current-moves', () => {
  const currentMoves = enzyme.shallow(<CurrentMoves />);
  expect(currentMoves).to.have.className('current-moves');
});

xit('has class active', () => {
  const currentMoves = enzyme.shallow(<CurrentMoves />);
  expect(currentMoves).to.have.className('active');
});

it('renders 2 moves', () => {
  const currentMoves = enzyme.shallow(<CurrentMoves />);
  expect(currentMoves)
    .to.have.exactly(2)
    .descendants(Move);
});

it('renders selected moves', () => {
  const currentMoves = enzyme.shallow(<CurrentMoves p1={1} />);
  expect(currentMoves.find(Move).first()).to.have.prop('selected', true);
  expect(currentMoves.find(Move).last()).to.have.prop('selected', true);
});

it('renders paper for player 1', () => {
  const currentMoves = enzyme.shallow(<CurrentMoves p1={1} p2={2} />);
  expect(currentMoves.find(Move).first()).to.have.prop('option', 1);
});

it('renders scissors for player 2', () => {
  const currentMoves = enzyme.shallow(<CurrentMoves p1={1} p2={2} />);
  expect(currentMoves.find(Move).last()).to.have.prop('option', 2);
});
