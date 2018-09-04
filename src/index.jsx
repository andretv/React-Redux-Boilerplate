import ReactDOM from 'react-dom';
import React from 'react';

import Loadable from 'react-loadable';

/**
 * Components.
 */
import Loading from 'components/loading';

/**
 * Service Worker.
 */
import registerServiceWorker from './registerServiceWorker';

/**
 * Global styles and normalizeCSS.
 */
import 'scss/global.scss';
import 'scss/normalize.scss';

/**
 * @description Root of the application.
 */
const Root = Loadable({
  loader: () => import('src/root'),
  loading: () => <Loading />,
});

/**
 * @description Renders Root application into the HTML.
 */
ReactDOM.render(<Root />, document.getElementById('app'));
registerServiceWorker();
