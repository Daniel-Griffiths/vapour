import React, { Component } from 'react'
import Game from './Game'

export default class GameList extends Component {
	render() {
		return ( 
			<div style={styles.gameList}> 
				{ this.props.games.map(game => <Game game={game} key={game.appid}/>) }	
			</div>
			
		)
	}
}

const styles = {
	gameList: {
		height: "100%",
		padding: "1rem",
		display: "grid",
		gridGap: "1rem",
		gridArea: "main",
		gridTemplateColumns: "repeat(auto-fill, minmax(300px, auto))"
	}
}