import React, { Component } from 'react'
import loader from'./../assets/img/loader.svg'

export default class GameLoader extends Component {
	render() {
		return (
			<img src={loader} alt="Loader" style={{
					display: 'block',
					margin: '1rem auto',
			}}/>
		)
	}
}