import React, { Component } from 'react'

export default class GameItem extends Component {
	render(){
		return (
			<div class="game"> 
				<div class="game__overlay"> 
					<div class="fas fa-play"></div>
				</div>
				<div class="game__inner">
					<img class="game__logo" src={this.props.game.image}/>
					<div class="game__description">{this.props.game.name}</div>
				</div>
  			</div>
		)
	}
}