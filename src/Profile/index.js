import React from 'react'
import ProfilePlan from './ProfilePlan'
import ProfileProgress from './ProfileProgress'


class Profile extends React.Component {
	constructor() {
		super()

		this.state = {
			showPlan: true,
			profPic: '',
			plans: [],
			firstName: '',
			lastName: ''
		}
	}

	componentDidMount() {
		this.getUser()
	}

	getUser = async () => {
		const { id } = this.props.match.params

		const userInfo = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/' + id, {
			method: 'GET',
			credentials: 'include'
		})
		console.log(userInfo, '<--- userInfo');

		if (userInfo.status !== 200) {
			throw Error('userInfo is not running')
		}

		const userInfoResponse = await userInfo.json()
		console.log(userInfoResponse, '<--- userInfoResponse');

		this.setState({
			plans: userInfoResponse.plans,
			firstName: userInfoResponse.userData.firstName,
			lastName: userInfoResponse.userData.lastName
		})
	}

	showPlan = (id, e) => {
		e.preventDefault()

		this.props.history.push('/plan/' + id)
	}

	render() {
		// console.log(this.state, '<----- state in profile');
		return (
			<div className='profile-page'>
				<h1 className='profile-page-title'>{this.state.firstName} {this.state.lastName}'s Profile</h1>
				<ProfilePlan 
					showPlan={this.showPlan} 
					plans={this.state.plans}
				/>
			</div>
		)
	}
}




export default Profile
