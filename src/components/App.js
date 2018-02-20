import React, { Component } from 'react'

import Alert from './Alert'
import GameList from './GameList'
import GameLoader from './GameLoader'
import { Redirect } from 'react-router-dom'

import './../assets/css/App.css'

export default class App extends Component {
  
  state = {
      games: [],
      steamID: '',
      steamSecret: '',
      errorMessage: '',
  } 

  componentDidMount() {
    const id = localStorage.getItem('steamId')
    const secret = localStorage.getItem('steamSecret')

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
    return this.state.games.filter(game => game.name.toLowerCase().includes(this.props.filter.toLowerCase()))
  }

  render() {

    // Redirect if the keys are blank
    if(!localStorage.getItem('steamId') || !localStorage.getItem('steamSecret')){
      return <Redirect to="/settings" />
    }       

    // Looks like there was an error getting the games
    if(this.state.errorMessage){
      return <Alert>{ this.state.errorMessage }</Alert>
    }

    // All good yo
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
