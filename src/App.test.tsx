import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme'
import * as enzyme from 'enzyme';
import * as React from 'react';

chai.use(chaiEnzyme())
const expect = chai.expect;

import App from './App';
import Game from './components/game/game';

it('renders without crashing', () => {
  const app = enzyme.shallow(<App/>);
  expect(app).to.have.exactly(1).descendants(Game)
});
