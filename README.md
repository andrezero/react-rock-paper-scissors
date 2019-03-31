# Rock Paper Scissors

> my first experiment with React

- Based on [typescript-react-starter](https://github.com/microsoft/typescript-react-starter)
- With further help from [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)
- Developing with [Storybook](https://storybook.js.org/) with [Typescript](https://storybook.js.org/docs/configurations/typescript-config/) support
- Testing components with [jest](https://jestjs.io), [enzyme](https://github.com/airbnb/enzyme) and [chai-enzyme](https://github.com/producthunt/chai-enzyme)
- Full on Typescript (with super strict linting)
- No Redux yet, React only

## Quickstart

```bash
yarn -i
yarn start
```

## Setup - for future reference

Project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and a few other tools were installed on top.

```bash
# created with react-scripts-ts
create-react-app my-app --scripts-version=react-scripts-ts
cd my-app

# testing dependencies
yarn add -D chai chai-enzyme enzyme enzyme-adapter-react-16 sinon @types/chai @types/chai-enzyme @types/enzyme @types/enzyme-adapter-react-16 @types/sinon

# storybook https://storybook.js.org/docs/configurations/typescript-config/
# with typescript + dopcgen support https://github.com/strothj/react-docgen-typescript-loader
npx -p @storybook/cli sb init
yarn add -D @storybook/addon-info react-docgen-typescript-webpack-plugin
yarn add -D awesome-typescript-loader react-docgen-typescript-loader
yarn add -D @types/storybook__react @types/storybook__addon-actions @types/storybook__addon-info @types/storybook__addon-links
# don't forget to add "rootDirs": ["src", "stories"] to tsconfig.json
# and to create .storybook/webpack.config.js

# husky > prettier
yarn add -D husky lint-staged prettier
# don't forget to add added "husky" and "lint-staged" to package.json

# app dependencies
yarn add classnames
yarn add -D @types/classnames
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `yarn test --coverage`

(note extra `--` in the middle) to include a coverage report like this:

Note that tests run much slower with coverage so it is recommended to run it separately from your normal workflow.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `yarn storybook`

Launches Storybook UI

* [Documentation](https://storybook.js.org/docs/basics/introduction/)

## Debugging in Visual Studio Code

Requirements:
- latest version of [VS Code](https://code.visualstudio.com)
- and VS Code [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

Start debugging in VS Code by pressing `F5` or by clicking the green debug icon.

## Todo

- [x] Prettier + git pre-commit-hook
- [ ] Test async behaviours
- [ ] Explore remaining tools of create-react-app [TUTORIAL.md](TUTORIAL)
