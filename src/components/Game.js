import React, { Component } from 'react'
import GameImage from './GameImage' 
import GameDescription from './GameDescription'

export default class Game extends Component {
	start(game) {

	}

	render() {
		return (
			<div onClick={() => this.start(this.props.game.id)}> 
				<div> 
					<div className="fas fa-play"></div>
				</div>
				<div>
					<GameImage src={this.props.game.image}/>
					<GameDescription>{this.props.game.name}</GameDescription>
				</div>
  			</div>
		)
	}
}