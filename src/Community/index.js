import React from 'react'
import CommunityList from './CommunityList'
import { Link } from 'react-router-dom'

class Community extends React.Component {
	constructor() {
		super()

		this.state = {
			plans: [],
			filterPlans: [],
			filter: false
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

	onlyStrength = (e) => {
		e.preventDefault()


		const onlyStr = this.state.plans.filter(plan => plan.goalType === 'Strength')

		this.setState({
			filterPlans: onlyStr,
			filter: true
		})
	}

	onlyWeightLoss = (e) => {
		e.preventDefault()

		const onlyWL = this.state.plans.filter(plan => plan.goalType === 'Weight Loss')
		console.log(onlyWL, '<--- onlyWL');

		this.setState({
			filterPlans: onlyWL,
			filter: true
		})
	}

	allPlans = (e) => {
		e.preventDefault()

		this.setState({filter: false})
	}

	render() {
		console.log(this.state, '<--- state in Community');
		return (
			<div>
				<h2>Community Page</h2>
				<div onClick={this.onlyStrength} style={{height: 100, width: 200, border: '1px solid black'}}>Strength</div>
				<div onClick={this.onlyWeightLoss} style={{height: 100, width: 200, border: '1px solid black'}}>Weight loss</div>
				<div onClick={this.allPlans} style={{height: 100, width: 200, border: '1px solid black'}}>All</div>
				<CommunityList filter={this.state.filter} plans={this.state.plans} filterPlans={this.state.filterPlans}/>
			</div>
		)
	}
}


export default Community