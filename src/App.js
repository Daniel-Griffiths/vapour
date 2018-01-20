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
      games: []
    } 
  }

  componentDidMount() {
    const id = '76561198025246708';
    const secret = 'redacted ;)';
    fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${secret}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`)
    .then(response => response.json())
    .then(response => response.response.games)
    .then(games => {
      this.setState({
        games
      })
    }).catch(error => {
      alert('Failed to load games. Please try restarting Vapour.')
    })  
  }

  render() {
    return (
      <div>
        <Nav>
          <NavItem>
            <GameSearch onTextChange={ text => this.setState({filter: text}) }/>
          </NavItem>
          <NavItem>
            <NavButton><i className="fas fa-shopping-cart"></i></NavButton>
          </NavItem>
          <NavItem>
            <NavButton><i className="fas fa-users"></i></NavButton>
          </NavItem>
          <NavItem>
            <NavButton><i className="fas fa-cog"></i></NavButton>
          </NavItem>
        </Nav>
        <GameList games={ this.state.games } filter={ this.state.filter }/>
      </div>
    );
  }
}

export default App;
