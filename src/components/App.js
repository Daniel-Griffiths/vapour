import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Alert from './Alert'
import GameList from './GameList'
import GameLoader from './GameLoader'

import './../assets/css/App.css'

export default class App extends Component {
  state = {
      filter: '',
      games: [],
      errorMessage: ''
  } 

  componentDidMount() {
    const id = localStorage.getItem('steamId')
    const secret = localStorage.getItem('steamSecret')

    if(!id || !secret){
      window.location.replace('/settings')
    }

    fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${secret}&steamid=${id}&format=json&include_appinfo=1&include_played_free_games=1`)
    .then(response => response.json())
    .then(response => response.response.games)
    .then(games => {
      this.setState({
        games
      })
    }).catch(error => {
      this.setState({
        errorMessage: 'Failed to load games. Please ensure the correct "Steam ID" and "Steam Secret" are set in the settings menu' 
      })
    })  
  }

  getGames() {
    return this.state.games.filter(game => game.name.toLowerCase().includes(this.state.filter.toLowerCase()))
  }

  render() {

    if(this.state.errorMessage){
      return <Alert>{ this.state.errorMessage }</Alert>
    }

    return (
      <div>
        { !this.state.games.length 
          ? 
            <div style={styles.container}>
              <GameLoader />
            </div>
          :
            <GameList games={ this.getGames() }/>
        }
      </div>
    )
  }
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContents: 'center'
  }
}
