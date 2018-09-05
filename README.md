<p align="center">
<img src="https://user-images.githubusercontent.com/22300747/43398950-ed2fca92-93df-11e8-85c3-34d036fa3674.png" width="250">
</p>

<p align="center">
<img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="Maintenance">
<img src="https://readthedocs.org/projects/ansicolortags/badge/?version=latest" alt="Documentation Status">
<img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT license">
</p>

## Table of Contents ##
- [Table of Contents](#table-of-contents)
- [Why?](#why)
- [Features](#features)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Patterns](#patterns)
- [License](#license)

<a name="why"></a>
## Why? ##
This boilerplate was created to facilitate the start and standardization of projects with react. Usually JavaScript projects do not follow a strict standard. As a consequence each one gets its structure and responsibilities in different places, making maintenance and immersion for new developers difficult.

<a name="features"></a>
## Features ##
All features are pre-configured and ready to use.
* :sparkles: [**React.js**](https://reactjs.org/) :sparkles: - Responsible for all the reactive magic.
* :airplane: [**React Router (DOM)**](https://reacttraining.com/react-router/web/guides/philosophy) :airplane: - Responsible for managing application routes.
* :broken_heart: [**Code Spliting**](https://github.com/jamiebuilds/react-loadable) :broken_heart: - Responsible for dividing your bundle in smaller chuncks.
* :books: [**Redux.js**](https://redux.js.org/) :books: - Responsible for managing aplication global state.
* :construction: [**Redux DevTools**](https://redux.js.org/) :construction: - Helps debuging redux state.
* :hourglass_flowing_sand: [**Redux Thunk**](https://github.com/reduxjs/redux-thunk) :hourglass_flowing_sand: - Responsible for dispatching redux async actions.
* :floppy_disk: [**Redux Persist**](https://github.com/rt2zz/redux-persist) :floppy_disk: - Persist and rehydrate a redux store.
* :icecream: [**Redux Freeze**](https://github.com/buunguyen/redux-freeze) :icecream: - Prevents store mutation.
* :briefcase: [**Service Worker**](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) :briefcase: - Caches bundle and all chunks.
* :package: [**Webpack**](https://webpack.js.org/) :package: - Module bundler.
* :wrench: [**Babel**](https://babeljs.io/) :wrench: - JavaScript compiler.
* :star: [**SASS**](https://sass-lang.com/) :star: - SASS syntax support.
* :cop: [**NormalizeCSS**](https://necolas.github.io/normalize.css/) :cop: - Makes browsers render all elements more consistently.
* :star2: [**PostCSS**](https://github.com/postcss/postcss) :star2: - Tool for transforming styles with JS plugins.
* :eyeglasses: [**Airbnb ESLint**](https://github.com/airbnb/javascript/tree/master/react) :eyeglasses: - Linter!
<br />

*For more info about any tecnology, click over the feature name.*
<a name="quick-start"></a>
## Quick start ##

For now the easy way to use the boilerplate would be just cloning the repo and resetting git.

**1. Clone the repo**
```bash
git clone REPO
```
**2. Go to project directory**
```bash
cd <project-path>
```
**3. Remove .git**
```bash
rm -rf .git
```
**4. Init fresh git**
```bash
git init
```
**5. Install dependencies**
```bash
npm install
```

*6. (Optional) You probably wanna add `/dist` to .gitignore*

<a name="project-structure"></a>
## Scripts ##

**Development**
```bash
npm run dev
```

**Build**
```bash
npm run build
```

**Serve build**
```bash
npm run serve
```

**Lint**
```bash
npm run lint
```

<a name="env"></a>
## Environment Variables ##

It's is important to duplicate `.env.example` and rename it to `.env`. There is two properties that are required by default for the boilerplate work properly: `PUBLIC_URL` and `API_URL`.

Can be in your interests to create more than one `.env` file. To automate the usage of this files, simply go to `webpack.config.js` and find the `Dotenv` plugin. Inside its options change the path logic.

*Exemple:*
```javascript
...
path: process.env.NODE_ENV === 'production' ? './.env.prod' : './.env',
...
```

<a name="project-structure"></a>
## Project Structure ##

<a name="patterns"></a>
## Patterns ##

<a name="license"></a>
## License ##

MIT license, Copyright (c) 2018 André Vaccari.
