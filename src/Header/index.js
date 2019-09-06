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

		const { history } = this.props
		if ( history ) history.push('/user/' + this.props.userId)
	}

	render() {
		return (
			<div>
				<h1>Weight Mate</h1>
				<div onClick={this.toCreate} style={{backgroundColor: 'lavender', height: 100, width: 100, display: 'inline-block'}}>Create</div>
				<div onClick={this.toCommunity} style={{backgroundColor: 'teal', height: 100, width: 100, display: 'inline-block'}}>Community</div>
				<div onClick={this.toProfile} style={{backgroundColor: 'tan', height: 100, width: 100, display: 'inline-block'}}>Profile</div>
			</div>
		)
	}
}



export default withRouter(Header);