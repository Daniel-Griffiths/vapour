import React, { Component } from 'react'
import GameItem from './GameItem'

export default class GameList extends Component {
	render(){
		return ( 
			<div>
				{this.props.games.map(game => {
					return <GameItem game={game}/>
				})}	
			</div>
		)
	}
}