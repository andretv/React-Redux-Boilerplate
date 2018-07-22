import ReactDOM from 'react-dom'
import React from 'react'

import Loadable from 'react-loadable'

import 'scss/global.scss'
import 'scss/normalize.scss'

const Root = Loadable({
  loader: () => import('src/root/root'),
  loading: () => <div>Carregando...</div>,
})

ReactDOM.render(
  <Root />,
  document.getElementById('app')
)
