import React, { Component } from 'react'

export default class GameItem extends Component {
	render(){
		return (
			<div class="game"> 
				<div class="game__overlay"> 
					<div class="fas fa-play"></div>
				</div>
				<div class="game__inner">
					<img class="game__logo" src="http://cdn.edgecast.steamstatic.com/steam/apps/524220/header.jpg?t=1511792873"/>
					<div class="game__description">NieR:Automata</div>
				</div>
  			</div>
		)
	}
}