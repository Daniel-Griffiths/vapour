import React, { Component } from 'react'

export default class Webview extends Component {
	render() {
		return <webview src={this.props.src} style={{ height: '100%' }}></webview>
	}
}