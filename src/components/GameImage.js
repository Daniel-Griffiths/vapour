import React, { Component } from 'react'
import defaultImage from './../assets/img/default.jpg'

export default class GameImage extends Component {
	render() {
		return (
			<img 
				src={ this.props.src } 
				alt={ this.props.alt }
				ref={ img => this.img = img } 
				onError={
				    () => this.img.src = defaultImage
				}
				style={
					{
						display: 'block',
						width: '100%',
					}
				}
			/>

		)
	}
}