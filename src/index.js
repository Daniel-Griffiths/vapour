import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Switch, Link  } from 'react-router-dom'

import App from './components/App'
import Nav from './components/Nav'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import NavItem from './components/NavItem'
import Button from './components/Button'
import GameSearch from './components/GameSearch'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
	<Router>
		<div>
			<Nav>
	          <NavItem>
	            <GameSearch onTextChange={ text => this.setState({filter: text}) }/>
	          </NavItem>
	          <NavItem>
	            <Link to="/"><Button href="#"><i className="fas fa-home"></i></Button></Link>
	          </NavItem>	          
	          <NavItem>
	            <a target="_blank" rel="noopener noreferrer" href="http://store.steampowered.com/"><Button><i className="fas fa-shopping-cart"></i></Button></a>
	          </NavItem>
	          <NavItem>
	            <a target="_blank" rel="noopener noreferrer" href="https://steamcommunity.com/chat"><Button><i className="fas fa-users"></i></Button></a>
	          </NavItem>
	          <NavItem>
	            <Link to="/settings"><Button href="#"><i className="fas fa-cog"></i></Button></Link>
	          </NavItem>
	        </Nav>
			<Switch>
				<Route path="/settings" component={Settings}/>
				<Route path="*" component={App} />
			</Switch>
		</div>
	</Router>
, document.getElementById('root'))

registerServiceWorker()
