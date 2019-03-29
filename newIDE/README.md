# GDevelop IDE

This is the GDevelop 5 editor. It is based on [React](https://facebook.github.io/react/), [Material-UI](http://www.material-ui.com), [Pixi.js](https://github.com/pixijs/pixi.js) and [Electron](https://electron.atom.io/).
It uses GDevelop [core C++ classes compiled to Javascript](https://github.com/4ian/GDevelop.js) to work with GDevelop games.

![GDevelop editor](https://raw.githubusercontent.com/4ian/GDevelop/master/newIDE/gd-ide-screenshot.png "GDevelop editor")

## 1) Installation 💻 

Make sure to have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org) installed. [Yarn](https://yarnpkg.com) is optional.

```bash
git clone https://github.com/4ian/GDevelop.git
cd GDevelop/newIDE/app
npm install # or yarn
```

## 2) Development 🤓

```bash
npm start # or yarn start
```

This will open the app in your web browser.

Images resources, GDJS Runtime, extensions will be copied in resources, and [libGD.js](https://github.com/4ian/GDevelop.js) will be downloaded automatically. If you wish, you can
[build libGD.js by yourself](https://github.com/4ian/GDevelop.js) (useful if you modified GDevelop native code like extensions).

> Note for Linux: If you get an error message that looks like this:
`Error: watch GD/newIDE/app/some/file ENOSPC` then follow the instructions [here](https://stackoverflow.com/questions/22475849/node-js-error-enospc) to fix.

### Development of the standalone app

You can run the app with Electron. **Make sure that you've run `npm start` (or `yarn start`) in `app` folder before** (see above).

```bash
cd newIDE/electron-app
npm install # or yarn

#For macOS:
./node_modules/electron/dist/Electron.app/Contents/MacOS/Electron app

#For Windows:
node node_modules\electron\cli.js app

#For Linux:
./node_modules/electron/dist/electron app
```

### Quick Install and Run

There is a script file that automates cloning this repository, building the newIde and running it

* For Windows: You can download the batch script [here](https://raw.githubusercontent.com/4ian/GDevelop/master/scripts/gitCloneAndBuildGD.bat) and save it to where you want GD to be cloned to, then simply run it.


### Development of UI components

You can run a [storybook](https://github.com/storybooks/storybook) that is used as a playground for rapid UI component development and testing:

```bash
cd newIDE/app
npm run storybook # or yarn storybook
```

### Tests

Unit tests, type checking and auto-formatting of the code can be launched with these commands:

```bash
cd newIDE/app
npm run test # or yarn test
npm run flow # or yarn flow
npm run format # or yarn format
```

### Theming

It's possible to create new themes for the UI. See [this file](https://github.com/4ian/GDevelop/blob/master/newIDE/app/src/UI/Theme/index.js) to declare a new theme. You can take a look at the [default theme](https://github.com/4ian/GDevelop/blob/master/newIDE/app/src/UI/Theme/DefaultTheme/index.js), including the [styling of the Events Sheets](https://github.com/4ian/GDevelop/blob/master/newIDE/app/src/UI/Theme/DefaultTheme/EventsSheet.css).

### Development of the game engine or extensions.

Make sure to have the standalone app running with Electron.

* If you want create/modify *a extensions*, check the [README about extensions](./README-extensions.md) for a step-by-step explanations to get started in 5 minutes.

* The *game engine core* ([GDJS](https://github.com/4ian/GDevelop/tree/master/GDJS)) is in [GDJS/Runtime folder](https://github.com/4ian/GDevelop/tree/master/GDJS/Runtime). If you modify anything, run the `import-GDJS-Runtime.js` script:

  ```bash
  cd newIDE/app
  cd scripts
  node import-GDJS-Runtime.js
  ```

  You can then launch a preview in GDevelop (again, be sure to be using [the standalone app running with Electron](https://github.com/4ian/GDevelop/blob/master/newIDE/README.md#development-of-the-standalone-app) to be sure to have your changes reflected immediately).

### Recommended tools for development

Any text editor is fine, but it's a good idea to have one with *Prettier* (code formatting), *ESLint* (code linting) and *Flow* (type checking) integration. [Modern JavaScript is used for the editor](https://github.com/4ian/GDevelop/blob/master/newIDE/docs/Supported-JavaScript-features-and-coding-style.md).

👉 You can use [Visual Studio Code](https://code.visualstudio.com) with these extensions: [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Flow Language Support](https://github.com/flowtype/flow-for-vscode).

## (Optional) Building and deploying the standalone app 📦

> 🖐 This section is only for maintainers that want to deploy the "official app" on the GDevelop website. If you're working on contributions for GDevelop, you won't need it.

### Desktop version

First, update version number which is read in `newIDE/electron-app/app/package.json`.

```bash
cd newIDE/electron-app
yarn build # or npm run build
```

This will build and package the Electron app for Windows, macOS and Linux (according to your OS). The output are stored inside `newIDE/electron-app/dist`.

To build artifacts for all platforms and publish to a draft GitHub release:

```
GH_TOKEN=xxx yarn build --mac --win --linux tar.gz --publish always
```

> To build beta versions, you can create archives: `yarn build --mac zip --win zip --linux tar.gz`.

### Webapp version

```bash
cd newIDE/web-app
yarn deploy # or npm run deploy
```

### (Optional) Updating translations

Extract translations from the editor, as well as GDevelop Core and extensions:
```bash
cd newIDE/app
yarn extract-all-translations # or npm run extract-all-translations
```

This will create `ide-messages.po` (in `newIDE/app/src/locales`) and `gdcore-gdcpp-gdjs-extensions-messages.pot` (in `scripts`). Upload both of them to [the GDevelop Crowdin project](https://crowdin.com/project/gdevelop).

To update translations, build and download the translations from Crowdin. Extract everything in `newIDE/app/src/locales`. And run:

```bash
yarn compile-translations # or npm run compile-translations
```

## 3) How to contribute? 😎

The editor, the game engine and extensions are always in development. Your contribution is welcome!

* Check the [the **roadmap** for ideas and features planned](https://trello.com/b/qf0lM7k8/gdevelop-roadmap).
  
  You can contribute by picking anything here or anything that you think is missing or could be improved in GD5! If you don't know how to start, it's a good idea to play a bit with the editor and see if there is something that is unavailable and that you can add or fix.

* Follow the [Development](https://github.com/4ian/GDevelop/tree/master/newIDE#development) section of the README to set up GDevelop and start modifying either **the editor** or **[the game engine/extensions](https://github.com/4ian/GDevelop/tree/master/newIDE#development-of-the-game-engine-or-extensions)**.

* To submit your changes, you have first to create a Fork on GitHub (use the Fork button on the top right), then [create a Pull Request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

* Finally, make sure that the tests pass (refer to this README and to the [game engine README](https://github.com/4ian/GDevelop/tree/master/GDJS)) for learning how to run tests.
