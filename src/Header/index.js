import React from 'react'
import { withRouter } from 'react-router-dom'
import Popup from 'reactjs-popup'

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

	toProfilePlans = (e) => {
		e.preventDefault()

		this.props.showUserPlans(true)

		const { history } = this.props
		if ( history ) history.push('/user/' + this.props.userId)
	}

	toProfileProgress = (e) => {
		e.preventDefault()

		this.props.showUserPlans(false)

		const { history } = this.props
		if ( history ) history.push('/user/' + this.props.userId)
	}

	render() {
		return (
			<div>
				<h1>Weight Mate</h1>
				<div onClick={this.toCreate} style={{backgroundColor: 'lavender', height: 40, width: 100, display: 'inline-block'}}>Create</div>
				<div onClick={this.toCommunity} style={{backgroundColor: 'teal', height: 40, width: 100, display: 'inline-block'}}>Community</div>
				<Popup 
					trigger={<div className='menu-item' style={{backgroundColor: 'tan', height: 40, width: 100, display: 'inline-block'}}>Profile</div>}
					position='bottom center'
					on='hover'
					closeOnDocumentClick
					mouseEnterDelay={0}
					mouseLeaveDelay={10}
					arrow={false}
					contentStyle={{ padding: "0px", border: "none" }}
				>
					<div className='menu'>
						<div className='menu-item' onClick={this.toProfilePlans}>Plans</div>
						<div className='menu-item' onClick={this.toProfileProgress}>Progress</div>
					</div>
				</Popup>
			</div>
		)
	}
}



export default withRouter(Header);