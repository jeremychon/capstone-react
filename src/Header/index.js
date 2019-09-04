import React from 'react'
import { withRouter } from 'react-router-dom'

class Header extends React.Component {

	toCreate = (e) => {
		e.preventDefault()
		
		const { history } = this.props
		if ( history ) history.push('/plan-new')
	}

	toCommunity = (e) => {
		e.preventDefault()

		const { history } = this.props
		if ( history ) history.push('/community')
	}

	toProfile = (e) => {
		e.preventDefault()

		console.log('To Profile');
	}

	render() {
		return (
			<div>
				<h1>Weight Mate</h1>
				<div onClick={this.toCreate} style={{backgroundColor: 'lavender', height: 100, width: 100}}>Create</div>
				<div onClick={this.toCommunity} style={{backgroundColor: 'teal', height: 100, width: 100}}>Community</div>
				<div onClick={this.toProfile} style={{backgroundColor: 'tan', height: 100, width: 100}}>Profile</div>
			</div>
		)
	}
}



export default withRouter(Header);