import React from 'react'
import CommunityList from './CommunityList'

class Community extends React.Component {
	constructor() {
		super()

		this.state = {
			plans: []
		}
	}

	componentDidMount() {
		this.getAllPlans()
	}

	getAllPlans = async () => {
		const allPlans = await fetch('http://localhost:9000/plan/', {
			method: 'GET',
			credentials: 'include'
		})

		if (allPlans.status !== 200) {
			throw Error('Plans not found')
		}

		const allPlansResponse = await allPlans.json()
		console.log(allPlansResponse, '<---- all plans');

		this.setState({
			plans: allPlansResponse.data
		})
	}

	render() {
		console.log(this.state, '<--- state in Community');
		return (
			<div>
				<h2>Community Page</h2>
				<CommunityList plans={this.state.plans}/>
			</div>
		)
	}
}


export default Community