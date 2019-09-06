import React from 'react'
import ProfilePlan from './ProfilePlan'
import ProfileProgress from './ProfileProgress'


class Profile extends React.Component {
	constructor() {
		super()

		this.state = {
			showPlan: true
		}
	}

	render() {
		return (
			<div>
				<h1>{this.props.firstName} {this.props.lastName}'s Profile</h1>
				{this.props.profileSwitch ? <ProfilePlan /> : null}
				{this.props.profileSwitch ? null : <ProfileProgress />}
			</div>
		)
	}
}




export default Profile
