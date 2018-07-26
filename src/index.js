import ReactDOM from 'react-dom';
import React from 'react';

import Loadable from 'react-loadable';

import registerServiceWorker from './registerServiceWorker';

import 'scss/global.scss';
import 'scss/normalize.scss';

/**
 * @description Root of the application.
 */
const Root = Loadable({
  loader: () => import('src/root/root'),
  loading: () => <div>Carregando...</div>,
});

/**
 * @description Renders Root application into the HTML.
 */
ReactDOM.render(<Root />, document.getElementById('app'));
registerServiceWorker();
