import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, HashRouter, Switch  } from 'react-router-dom'

import Setup from './pages/Setup'
import App from './components/App'
import NotFound from './pages/NotFound'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
	<HashRouter>
		<Switch>
			<Route exact path="/" component={App}/>
			<Route path="/setup" component={Setup}/>
			<Route path="*" component={NotFound} />
		</Switch>
	</HashRouter>
, document.getElementById('root'))

registerServiceWorker()
