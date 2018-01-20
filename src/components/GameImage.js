import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'
import GameLoader from './GameLoader'

export default class GameImage extends Component {
	render() {
		return (
			<LazyLoad height={200} offset={200} placeholder={<GameLoader />} once>
				<img src={ this.props.src } alt={ this.props.alt } style={
					{
						display: 'block',
						width: '100%',
					}
				}/>
			</LazyLoad>
		)
	}
}