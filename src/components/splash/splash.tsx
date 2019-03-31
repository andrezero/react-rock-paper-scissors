import * as React from 'react';
import './splash.css';

interface ISplashProps {
  onStart: () => void
}

class Splash extends React.Component<ISplashProps> {
  public render() {
    return (
      <div className="splash container">
        <div className="header">
          <h1>Welcome</h1>
        </div>
        <div className="intro">
          <p>This is my first experiment with React</p>
          <ul>
            <li>Based on <a href="https://github.com/microsoft/typescript-react-starter">typescript-react-starter</a></li>
            <li>With further help from <a href="https://github.com/piotrwitek/react-redux-typescript-guide">react-redux-typescript-guide</a></li>
            <li>
            <li>
              Developing with <a href="https://storybook.js.org/">Storybook</a> with <a href="https://storybook.js.org/docs/configurations/typescript-config/">Typescript</a> support
            </li>
              Testing components with <a href="https://jestjs.io">jest</a>, <a href="https://github.com/airbnb/enzyme">enzyme</a> and <a href="https://github.com/producthunt/chai-enzyme">chai-enzyme</a>
            </li>
            <li>Full on Typescript (with super strict linting)</li>
            <li>No Redux yet, React only</li>
          </ul>
        </div>
        <div className="footer">
          <button className="button start" onClick={this.handleClick}>start</button>
        </div>
      </div>
    );
  }

  private handleClick = () => {
    this.props.onStart()
  }
}

export default Splash;
