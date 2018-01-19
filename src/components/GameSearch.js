import React, { Component } from 'react'

export default class GameSearch extends Component {
	render(){
		return (
			<div>
				<i className="fas fa-search" style={
					{
						top: '1rem',
						left: '1.25rem',
						position: 'absolute',
					}
				}></i>
				<input placeholder="Search" autoFocus style={
					{
						border: '0',
						color: 'inherit',
						padding: '.5rem 1rem .5rem 2.5rem',
						background: '#404b58',
					}
				}/>
			</div>
		)
	}
}