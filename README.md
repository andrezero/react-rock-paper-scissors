# Rock Paper Scissors

> my first experiment with React

- Based on [https://github.com/microsoft/typescript-react-starter](typescript-react-starter)
- With further help from [https://github.com/piotrwitek/react-redux-typescript-guide](react-redux-typescript-guide)
- Developing with [Storybook](https://storybook.js.org/) with [Typescript](https://storybook.js.org/docs/configurations/typescript-config/) support
- Testing components with
[https://jestjs.io](jest),
[https://github.com/airbnb/enzyme](enzyme) and [https://github.com/producthunt/chai-enzyme](chai-enzyme)
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
yarn add -D @types/storybook__react @types/storybook__addon-actions @types/storybook__addon-links
# don't forget to add "rootDirs": ["src", "stories"] to tsconfig.json
# and to create .storybook/webpack.config.js

# husky > prettier
yarn add husky lint-staged prettier

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

## Formatting Code Automatically

Prettier is an opinionated code formatter with support for JavaScript, CSS and JSON. With Prettier you can format the code you write automatically to ensure a code style within your project. See the [Prettier's GitHub page](https://github.com/prettier/prettier) for more information, and look at this [page to see it in action](https://prettier.github.io/prettier/).

To format our code whenever we make a commit in git, we need to install the following dependencies:

```sh
npm install --save husky lint-staged prettier
```

Alternatively you may use `yarn`:

```sh
yarn add husky lint-staged prettier
```

* `husky` makes it easy to use githooks as if they are npm scripts.
* `lint-staged` allows us to run scripts on staged files in git. See this [blog post about lint-staged to learn more about it](https://medium.com/@okonetchnikov/make-linting-great-again-f3890e1ad6b8).
* `prettier` is the JavaScript formatter we will run before commits.

Now we can make sure every file is formatted correctly by adding a few lines to the `package.json` in the project root.

Add the following line to `scripts` section:

```diff
  "scripts": {
+   "precommit": "lint-staged",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

Next we add a 'lint-staged' field to the `package.json`, for example:

```diff
  "dependencies": {
    // ...
  },
+ "lint-staged": {
+   "src/**/*.{js,jsx,json,css}": [
+     "prettier --single-quote --write",
+     "git add"
+   ]
+ },
  "scripts": {
```

Now, whenever you make a commit, Prettier will format the changed files automatically. You can also run `./node_modules/.bin/prettier --single-quote --write "src/**/*.{js,jsx,json,css}"` to format your entire project for the first time.

Next you might want to integrate Prettier in your favorite editor. Read the section on [Editor Integration](https://prettier.io/docs/en/editors.html) on the Prettier GitHub page.

## Code Splitting

Instead of downloading the entire app before users can use it, code splitting allows you to split your code into small chunks which you can then load on demand.

This project setup supports code splitting via [dynamic `import()`](http://2ality.com/2017/01/import-operator.html#loading-code-on-demand). Its [proposal](https://github.com/tc39/proposal-dynamic-import) is in stage 3. The `import()` function-like form takes the module name as an argument and returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which always resolves to the namespace object of the module.


## Adding a CSS Preprocessor (Sass, Less etc.)

Generally, we recommend that you don’t reuse the same CSS classes across different components. For example, instead of using a `.Button` CSS class in `<AcceptButton>` and `<RejectButton>` components, we recommend creating a `<Button>` component with its own `.Button` styles, that both `<AcceptButton>` and `<RejectButton>` can render (but [not inherit](https://facebook.github.io/react/docs/composition-vs-inheritance.html)).

Following this rule often makes CSS preprocessors less useful, as features like mixins and nesting are replaced by component composition. You can, however, integrate a CSS preprocessor if you find it valuable. In this walkthrough, we will be using Sass, but you can also use Less, or another alternative.

First, let’s install the command-line interface for Sass:

```sh
npm install --save node-sass-chokidar
```

Alternatively you may use `yarn`:

```sh
yarn add node-sass-chokidar
```

Then in `package.json`, add the following lines to `scripts`:

```diff
   "scripts": {
+    "build-css": "node-sass-chokidar src/ -o src/",
+    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test --env=jsdom",
```

>Note: To use a different preprocessor, replace `build-css` and `watch-css` commands according to your preprocessor’s documentation.

Now you can rename `src/App.css` to `src/App.scss` and run `npm run watch-css`. The watcher will find every Sass file in `src` subdirectories, and create a corresponding CSS file next to it, in our case overwriting `src/App.css`. Since `src/App.js` still imports `src/App.css`, the styles become a part of your application. You can now edit `src/App.scss`, and `src/App.css` will be regenerated.

To share variables between Sass files, you can use Sass imports. For example, `src/App.scss` and other component style files could include `@import "./shared.scss";` with variable definitions.

To enable importing files without using relative paths, you can add the  `--include-path` option to the command in `package.json`.

```
"build-css": "node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar --include-path ./src --include-path ./node_modules src/ -o src/ --watch --recursive",
```

This will allow you to do imports like

```scss
@import 'styles/_colors.scss'; // assuming a styles directory under src/
@import 'nprogress/nprogress'; // importing a css file from the nprogress node module
```

At this point you might want to remove all CSS files from the source control, and add `src/**/*.css` to your `.gitignore` file. It is generally a good practice to keep the build products outside of the source control.

As a final step, you may find it convenient to run `watch-css` automatically with `npm start`, and run `build-css` as a part of `npm run build`. You can use the `&&` operator to execute two scripts sequentially. However, there is no cross-platform way to run two scripts in parallel, so we will install a package for this:

```sh
npm install --save npm-run-all
```

Alternatively you may use `yarn`:

```sh
yarn add npm-run-all
```

Then we can change `start` and `build` scripts to include the CSS preprocessor commands:

```diff
   "scripts": {
     "build-css": "node-sass-chokidar src/ -o src/",
     "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
-    "start": "react-scripts-ts start",
-    "build": "react-scripts-ts build",
+    "start-js": "react-scripts-ts start",
+    "start": "npm-run-all -p watch-css start-js",
+    "build": "npm run build-css && react-scripts-ts build",
     "test": "react-scripts test --env=jsdom",
     "eject": "react-scripts eject"
   }
```

Now running `npm start` and `npm run build` also builds Sass files.

**Why `node-sass-chokidar`?**

`node-sass` has been reported as having the following issues:

- `node-sass --watch` has been reported to have *performance issues* in certain conditions when used in a virtual machine or with docker.

- Infinite styles compiling [#1939](https://github.com/facebookincubator/create-react-app/issues/1939)

- `node-sass` has been reported as having issues with detecting new files in a directory [#1891](https://github.com/sass/node-sass/issues/1891)

 `node-sass-chokidar` is used here as it addresses these issues.

## Adding Images, Fonts, and Files

With Webpack, using static assets like images and fonts works similarly to CSS.

You can **`import` a file right in a TypeScript module**. This tells Webpack to include that file in the bundle. Unlike CSS imports, importing a file gives you a string value. This value is the final path you can reference in your code, e.g. as the `src` attribute of an image or the `href` of a link to a PDF.

To reduce the number of requests to the server, importing images that are less than 10,000 bytes returns a [data URI](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) instead of a path. This applies to the following file extensions: bmp, gif, jpg, jpeg, and png. SVG files are excluded due to [#1153](https://github.com/facebookincubator/create-react-app/issues/1153).

Before getting started, you must define each type of asset as a valid module format. Otherwise, the TypeScript compiler will generate an error like this:

>Cannot find module './logo.png'.

To import asset files in TypeScript, create a new type definition file in your project, and name it something like `assets.d.ts`. Then, add a line for each type of asset that you need to import:

```ts
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.svg";
```
(you'll have to restart the compiler in order the changes to take place)

In this case, we've added several image file extensions as valid module formats.

Now that the compiler is configured, here is an example of importing an image file:

```js
import React from 'react';
import logo from './logo.svg'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

This ensures that when the project is built, Webpack will correctly move the images into the build folder, and provide us with correct paths.

This works in CSS too:

```css
.Logo {
  background-image: url(./logo.png);
}
```

Webpack finds all relative module references in CSS (they start with `./`) and replaces them with the final paths from the compiled bundle. If you make a typo or accidentally delete an important file, you will see a compilation error, just like when you import a non-existent JavaScript module. The final filenames in the compiled bundle are generated by Webpack from content hashes. If the file content changes in the future, Webpack will give it a different name in production so you don’t need to worry about long-term caching of assets.

Please be advised that this is also a custom feature of Webpack.

**It is not required for React** but many people enjoy it (and React Native uses a similar mechanism for images).<br>
An alternative way of handling static assets is described in the next section.

## Adding assets to the `public` Folder

You can also add other assets to the `public` folder.

Inside `index.html`, you can use it like this:

```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
```

In JavaScript code, you can use `process.env.PUBLIC_URL` for similar purposes:

```js
render() {
  // Note: this is an escape hatch and should be used sparingly!
  // Normally we recommend using `import` for getting asset URLs
  // as described in “Adding Images and Fonts” above this section.
  return <img src={process.env.PUBLIC_URL + '/img/logo.png'} />;
}
```

## Using Global Variables

```js
const $ = window.$;
```

## Adding a Router

Create React App doesn't prescribe a specific routing solution, but [React Router](https://reacttraining.com/react-router/) is the most popular one.

To add it, run:

```sh
npm install --save react-router-dom
```

Alternatively you may use `yarn`:

```sh
yarn add react-router-dom
```

To try it, delete all the code in `src/App.js` and replace it with any of the examples on its website. The [Basic Example](https://reacttraining.com/react-router/web/example/basic) is a good place to get started.

Note that [you may need to configure your production server to support client-side routing](#serving-apps-with-client-side-routing) before deploying your app.

## Adding Custom Environment Variables

Your project can consume variables declared in your environment as if they were declared locally in your JS files. By
default you will have `NODE_ENV` defined for you, and any other environment variables starting with
`REACT_APP_`.

Environment variables will be defined for you on `process.env`. For example, having an environment
variable named `REACT_APP_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_SECRET_CODE`.


```jsx
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
      </form>
    </div>
  );
}
```

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

### Referencing Environment Variables in the HTML

>Note: this feature is available with `react-scripts@0.9.0` and higher.

You can also access the environment variables starting with `REACT_APP_` in the `public/index.html`. For example:

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```


### Adding Temporary Environment Variables In Your Shell

Defining environment variables can vary between OSes. It’s also important to know that this manner is temporary for the
life of the shell session.

```bash
REACT_APP_SECRET_CODE=abcdef npm start
```

### Adding Development Environment Variables In `.env`

To define permanent environment variables, create a file called `.env` in the root of your project:

```
REACT_APP_SECRET_CODE=abcdef
```

>Note: You must create custom environment variables beginning with `REACT_APP_`. Any other variables except `NODE_ENV` will be ignored to avoid [accidentally exposing a private key on the machine that could have the same name](https://github.com/facebookincubator/create-react-app/issues/865#issuecomment-252199527). Changing any environment variables will require you to restart the development server if it is running.

`.env` files **should be** checked into source control (with the exclusion of `.env*.local`).

#### What other `.env` files are can be used?

>Note: this feature is **available with `react-scripts@1.0.0` and higher**.

* `.env`: Default.
* `.env.local`: Local overrides. **This file is loaded for all environments except test.**
* `.env.development`, `.env.test`, `.env.production`: Environment-specific settings.
* `.env.development.local`, `.env.test.local`, `.env.production.local`: Local overrides of environment-specific settings.

Files on the left have more priority than files on the right:

* `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
* `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
* `npm test`: `.env.test.local`, `.env.test`, `.env` (note `.env.local` is missing)

These variables will act as the defaults if the machine does not explicitly set them.<br>
Please refer to the [dotenv documentation](https://github.com/motdotla/dotenv) for more details.

>Note: If you are defining environment variables for development, your CI and/or hosting platform will most likely need
these defined as well. Consult their documentation how to do this. For example, see the documentation for [Travis CI](https://docs.travis-ci.com/user/environment-variables/) or [Heroku](https://devcenter.heroku.com/articles/config-vars).

#### Expanding Environment Variables In `.env`

>Note: this feature is available with `react-scripts@1.1.0` and higher.

Expand variables already on your machine for use in your `.env` file (using [dotenv-expand](https://github.com/motdotla/dotenv-expand)).

For example, to get the environment variable `npm_package_version`:

```
REACT_APP_VERSION=$npm_package_version
# also works:
# REACT_APP_VERSION=${npm_package_version}
```

Or expand variables local to the current `.env` file:

```
DOMAIN=www.example.com
REACT_APP_FOO=$DOMAIN/foo
REACT_APP_BAR=$DOMAIN/bar
```

## Can I Use Decorators?

Many popular libraries use [decorators](https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841) in their documentation.<br>
Create React App doesn’t support decorator syntax at the moment because:

* It is an experimental proposal and is subject to change.
* The current specification version is not officially supported by Babel.
* If the specification changes, we won’t be able to write a codemod because we don’t use them internally at Facebook.

However in many cases you can rewrite decorator-based code without decorators just as fine.<br>
Please refer to these two threads for reference:

* [#214](https://github.com/facebookincubator/create-react-app/issues/214)
* [#411](https://github.com/facebookincubator/create-react-app/issues/411)

Create React App will add decorator support when the specification advances to a stable stage.

## Fetching Data with AJAX Requests

React doesn't prescribe a specific approach to data fetching, but people commonly use either a library like [axios](https://github.com/axios/axios) or the [`fetch()` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) provided by the browser. Conveniently, Create React App includes a polyfill for `fetch()` so you can use it without worrying about the browser support.

The global `fetch` function allows to easily makes AJAX requests. It takes in a URL as an input and returns a `Promise` that resolves to a `Response` object. You can find more information about `fetch` [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

This project also includes a [Promise polyfill](https://github.com/then/promise) which provides a full implementation of Promises/A+. A Promise represents the eventual result of an asynchronous operation, you can find more information about Promises [here](https://www.promisejs.org/) and [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Both axios and `fetch()` use Promises under the hood. You can also use the [`async / await`](https://davidwalsh.name/async-await) syntax to reduce the callback nesting.

You can learn more about making AJAX requests from React components in [the FAQ entry on the React website](https://reactjs.org/docs/faq-ajax.html).

### Continuous Integration

By default `npm test` runs the watcher with interactive CLI. However, you can force it to run tests once and finish the process by setting an environment variable called `CI`.

When creating a build of your application with `npm run build` linter warnings are not checked by default. Like `npm test`, you can force the build to perform a linter warning check by setting the environment variable `CI`. If any warnings are encountered then the build fails.

Popular CI servers already set the environment variable `CI` by default but you can do this yourself too:

### On CI servers
#### Travis CI

1. Following the [Travis Getting started](https://docs.travis-ci.com/user/getting-started/) guide for syncing your GitHub repository with Travis.  You may need to initialize some settings manually in your [profile](https://travis-ci.org/profile) page.
1. Add a `.travis.yml` file to your git repository.
```
language: node_js
node_js:
  - 6
cache:
  directories:
    - node_modules
script:
  - npm run build
  - npm test
```
1. Trigger your first build with a git push.
1. [Customize your Travis CI Build](https://docs.travis-ci.com/user/customizing-the-build/) if needed.

#### CircleCI

Follow [this article](https://medium.com/@knowbody/circleci-and-zeits-now-sh-c9b7eebcd3c1) to set up CircleCI with a Create React App project.

### On your own environment
##### Windows (cmd.exe)

```cmd
set CI=true&&npm test
```

```cmd
set CI=true&&npm run build
```

(Note: the lack of whitespace is intentional.)

##### Windows (Powershell)

```Powershell
($env:CI = $true) -and (npm test)
```

```Powershell
($env:CI = $true) -and (npm run build)
```

##### Linux, macOS (Bash)

```bash
CI=true npm test
```

```bash
CI=true npm run build
```

The test command will force Jest to run tests once instead of launching the watcher.

>  If you find yourself doing this often in development, please [file an issue](https://github.com/facebookincubator/create-react-app/issues/new) to tell us about your use case because we want to make watcher the best experience and are open to changing how it works to accommodate more workflows.

The build command will check for linter warnings and fail if any are found.

### Disabling jsdom

By default, the `package.json` of the generated project looks like this:

```js
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom"
```

If you know that none of your tests depend on [jsdom](https://github.com/tmpvar/jsdom), you can safely remove `--env=jsdom`, and your tests will run faster:

```diff
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
-   "test": "react-scripts test --env=jsdom"
+   "test": "react-scripts test"
```

To help you make up your mind, here is a list of APIs that **need jsdom**:

* Any browser globals like `window` and `document`
* [`ReactDOM.render()`](https://facebook.github.io/react/docs/top-level-api.html#reactdom.render)
* [`TestUtils.renderIntoDocument()`](https://facebook.github.io/react/docs/test-utils.html#renderintodocument) ([a shortcut](https://github.com/facebook/react/blob/34761cf9a252964abfaab6faf74d473ad95d1f21/src/test/ReactTestUtils.js#L83-L91) for the above)
* [`mount()`](http://airbnb.io/enzyme/docs/api/mount.html) in [Enzyme](http://airbnb.io/enzyme/index.html)

In contrast, **jsdom is not needed** for the following APIs:

* [`TestUtils.createRenderer()`](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) (shallow rendering)
* [`shallow()`](http://airbnb.io/enzyme/docs/api/shallow.html) in [Enzyme](http://airbnb.io/enzyme/index.html)

Finally, jsdom is also not needed for [snapshot testing](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html).

### Snapshot Testing

Snapshot testing is a feature of Jest that automatically generates text snapshots of your components and saves them on the disk so if the UI output changes, you get notified without manually writing any assertions on the component output. [Read more about snapshot testing.](http://facebook.github.io/jest/blog/2016/07/27/jest-14.html)

### Editor Integration

If you use [Visual Studio Code](https://code.visualstudio.com), there is a [Jest extension](https://github.com/orta/vscode-jest) which works with Create React App out of the box. This provides a lot of IDE-like features while using a text editor: showing the status of a test run with potential fail messages inline, starting and stopping the watcher automatically, and offering one-click snapshot updates.

![VS Code Jest Preview](https://cloud.githubusercontent.com/assets/49038/20795349/a032308a-b7c8-11e6-9b34-7eeac781003f.png)


### Debugging Tests in Visual Studio Code

Debugging Jest tests is supported out of the box for [Visual Studio Code](https://code.visualstudio.com).

Use the following [`launch.json`](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations) configuration file:
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug CRA Tests",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/react-scripts",
      "args": [
        "test",
        "--runInBand",
        "--no-cache",
        "--env=jsdom"
      ],
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

