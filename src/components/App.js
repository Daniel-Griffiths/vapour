import React, { Component } from 'react'
import Nav from './Nav'
import NavItem from './NavItem'
import GameList from './GameList'
import NavButton from './NavButton'
import GameLoader from './GameLoader'
import GameSearch from './GameSearch'
import './../assets/css/App.css';

export default class App extends Component {
  state = {
      filter: '',
      games: []
  } 

  componentDidMount() {
    const id = '76561198025246708';
    const secret = '';
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

  getGames() {
    return this.state.games.filter(game => game.name.toLowerCase().includes(this.state.filter.toLowerCase()))
  }

  render() {
    return (
      <div>
        <Nav>
          <NavItem>
            <GameSearch onTextChange={ text => this.setState({filter: text}) }/>
          </NavItem>
          <NavItem>
            <NavButton target="_blank" href="http://store.steampowered.com/"><i className="fas fa-shopping-cart"></i></NavButton>
          </NavItem>
          <NavItem>
            <NavButton target="_blank" href="https://steamcommunity.com/chat"><i className="fas fa-users"></i></NavButton>
          </NavItem>
          <NavItem>
            <NavButton href="#"><i className="fas fa-cog"></i></NavButton>
          </NavItem>
        </Nav>
        { !this.state.games.length 
          ? 
            <div style={
              { 
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContents: 'center'
              }
            }>
              <GameLoader />
            </div>
          :
            <GameList games={ this.getGames() }/>
        }
      </div>
    )
  }
}
