import React, { Component } from 'react'
import GameImage from './GameImage' 
import GameOverlay from './GameOverlay'
import GameDescription from './GameDescription'

export default class Game extends Component {
	start(game) {

	}

	render() {
		return (
			<div onClick={() => this.start(this.props.game.id)}
			style={
				{
					position: 'relative',
					overflow: 'hidden',
					transition: '.3s ease',
					boxShadow: 'var(--box-shadow-primary)',
					background: 'var(--brand-primary)',
				}
			}> 
				<GameOverlay> 
					<i className="fas fa-play"></i>
				</GameOverlay>
				<div>
					<GameImage src={this.props.game.image}/>
					<GameDescription>{this.props.game.name}</GameDescription>
				</div>
  			</div>
		)
	}
}