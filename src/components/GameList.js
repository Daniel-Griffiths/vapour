import React, { Component, Fragment } from 'react'
import Game from './Game'

export default class GameList extends Component {
	render() {
		return ( 
			<div style={styles.gameList}> 
				{ this.props.games.length
					?
						<Fragment>
							{ this.props.games.map(game => <Game game={game} key={game.appid}/>) }	
						</Fragment>
					:
						<Fragment>
							No game were found.
						</Fragment>
				}
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
		gridTemplateColumns: "repeat(auto-fit, minmax(300px, auto))"
	}
}