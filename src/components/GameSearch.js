import Input from './Input'
import React, { Component } from 'react'

export default class GameSearch extends Component {
	render(){

		return (
			<div>
				<i className="fas fa-search" style={styles.icon}></i>
				<Input 
					style={{ padding: '.5rem 1rem .5rem 2.5rem' }}
					placeholder="Search" 
					autoFocus="true" 
					onKeyUp={
						event => this.props.onTextChange(event.target.value)
					}
				/>
			</div>
		)
	}
}

const styles = {
	icon: {
		top: '1.2rem',
		left: '1.25rem',
		position: 'absolute',
	}
}