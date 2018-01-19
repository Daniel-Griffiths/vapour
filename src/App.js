import React, { Component } from 'react'
import Nav from './components/Nav'
import NavItem from './components/NavItem'
import NavButton from './components/NavButton'
import GameList from './components/GameList'
import GameSearch from './components/GameSearch'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      filter: '',
      games: [
        {
          id: 524220,
          name: 'Nier',
          image: 'http://cdn.edgecast.steamstatic.com/steam/apps/524220/header.jpg?t=1511792873'
        },
        {
          id: 39140,
          name: 'FF7',
          image: 'http://freepcgamesden.com/wp-content/uploads/2015/12/Final-Fantasy-VII-Steam-Free-Game-Full-Download.jpg'
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <Nav>
          <NavItem>
            <GameSearch onTextChange={ text => this.setState({filter: text}) }/>
          </NavItem>
          <NavItem>
            <NavButton>
              <i className="fas fa-shopping-cart"></i>  
            </NavButton>
          </NavItem>
          <NavItem>
            <NavButton>
              <i className="fas fa-users"></i> 
            </NavButton>
          </NavItem>
          <NavItem>
            <NavButton>
              <i className="fas fa-cog"></i> 
            </NavButton>
          </NavItem>
        </Nav>
        <GameList games={ this.state.games } filter={ this.state.filter }/>
      </div>
    );
  }
}

export default App;
