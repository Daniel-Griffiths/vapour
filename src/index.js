import ReactDOM from 'react-dom'
import React, { Component, Fragment } from 'react'
import registerServiceWorker from './registerServiceWorker'
import { Route, HashRouter as Router, Switch, Link  } from 'react-router-dom'

import App from './components/App'
import Nav from './components/Nav'
import Button from './components/Button'
import Webview from './components/Webview'
import GameSearch from './components/GameSearch'

import NotFound from './pages/NotFound'
import Settings from './pages/Settings'

class Index extends Component {

	state = {
		filter: ''
	}

	render(){
		return (
			<Router>
				<Fragment>
					<Nav>
			          <div>
			            <GameSearch onTextChange={ text => this.setState({filter: text}) }/>
			          </div>
			          <div>
			            <Link to="/"><Button href="#"><i className="fas fa-home"></i></Button></Link>
			          </div>	          
			          <div>
			            <Link to="/store"><Button><i className="fas fa-shopping-cart"></i></Button></Link>
			          </div>
			          <div>
			            <Link to="/chat"><Button><i className="fas fa-users"></i></Button></Link>
			          </div>
			          <div>
			            <Link to="/settings"><Button href="#"><i className="fas fa-cog"></i></Button></Link>
			          </div>
			        </Nav>
					<Switch>
						<Route exact path="/" render={ () => <App filter={ this.state.filter } /> }/>
						<Route path="/store" render={ () => <Webview src="https://store.steampowered.com/" /> }/>
						<Route path="/chat" render={ () => <Webview src="https://steamcommunity.com/chat" /> }/>
						<Route path="/settings" component={Settings}/>
						<Route path="*" component={NotFound} />
					</Switch>
				</Fragment>
			</Router>
		)
	}
}

ReactDOM.render(<Index/>, document.getElementById('root'))

registerServiceWorker()
