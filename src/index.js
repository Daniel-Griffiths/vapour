import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Route, HashRouter as Router, Switch, Link  } from 'react-router-dom'

import App from './components/App'
import Nav from './components/Nav'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import NavItem from './components/NavItem'
import Button from './components/Button'
import GameSearch from './components/GameSearch'
import registerServiceWorker from './registerServiceWorker'

class Index extends Component {

	state = {
		filter: ''
	}

	render(){
		return (
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
						<Route exact path="/" render={ () => <App filter={ this.state.filter } /> }/>
						<Route path="/settings" component={Settings}/>
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<Index/>, document.getElementById('root'))

registerServiceWorker()
