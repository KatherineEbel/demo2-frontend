import * as React from 'react'
import { render } from 'react-dom'
import * as cssProp from 'styled-components/cssprop'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import 'normalize.css'
import { App } from './components/App'
import { AppProvider } from './providers/AppProvider'

render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
)
