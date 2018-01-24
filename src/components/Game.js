import React, { Component } from 'react'
import GameImage from './GameImage' 
import GameOverlay from './GameOverlay'
import GameDescription from './GameDescription'
const exec = window.require('child_process').exec

export default class Game extends Component {
	start(game) {
		exec('c:\\WINDOWS\\system32\\cmd.exe /c START steam://rungameid/' + game)
	}

	render() {
		return (
			<div onClick={() => this.start(this.props.game.appid)}
			style={styles.game}> 
				<GameOverlay> 
					<i className="fas fa-play"></i>
				</GameOverlay>
				<div>
					<GameImage src={ 'http://cdn.akamai.steamstatic.com/steam/apps/' + this.props.game.appid + '/header.jpg' } 
					alt={ this.props.game.name }/>
					<GameDescription>{this.props.game.name}</GameDescription>
				</div>
  			</div>
		)
	}
}

const styles = {
	game: {
		position: 'relative',
		overflow: 'hidden',
		transition: '.3s ease',
		boxShadow: 'var(--box-shadow-primary)',
		background: 'var(--brand-primary)',
	}
}
