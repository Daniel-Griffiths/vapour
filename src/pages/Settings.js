import styled from 'styled-components'
import React, { Component } from 'react'
import Label from './../components/Label'
import Input from './../components/Input'
import Button from './../components/Button'

const FormContainer = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;

	form {
		width: 300px;
		max-width: 100%;
	}
`

export default class Settings extends Component {

	onSubmit(e) {
		e.preventDefault()
		localStorage.setItem('steamId', e.target.steamId.value)
		localStorage.setItem('steamSecret', e.target.steamSecret.value)
  		alert('Settings have been successfully saved!')
	}

	render() {
		return (
			<FormContainer>
				<form onSubmit={ (e) => this.onSubmit(e) }>
					<Label style={{ marginBottom: '.5rem' }}>Steam ID</Label>
					<Input 
						style={{ marginBottom: '1rem' }} 
						defaultValue={ localStorage.getItem('steamId') || '' } 
						name="steamId" 
						type="text" 
					/>

					<Label style={{ marginBottom: '.5rem' }}>Steam Secret Key</Label>
					<Input 
						style={{ marginBottom: '1rem' }} 
						defaultValue={ localStorage.getItem('steamSecret') || '' } 
						name="steamSecret" 
						type="text" 
					/>

					<Button type="submit">Save Settings</Button>
				</form>
			</FormContainer>
		)
	}
}