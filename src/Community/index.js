import React from 'react'
import CommunityList from './CommunityList'

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

		const sharedPlans = allPlansResponse.data.filter(plan => plan.public === true)

		this.setState({
			plans: sharedPlans
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

		const onlyWL = this.state.plans.filter(plan => plan.goalType === 'Weight loss')
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

	showPlan = (id, e) => {
		e.preventDefault()

		this.props.history.push('/plan/' + id)
	}

	render() {
		console.log(this.state, '<--- state in Community');
		return (
			<div>
				<h2>Community Page</h2>
				<div onClick={this.onlyStrength} style={{height: 100, width: 200, border: '1px solid black', display: 'inline-block'}}>Strength</div>
				<div onClick={this.onlyWeightLoss} style={{height: 100, width: 200, border: '1px solid black', display: 'inline-block'}}>Weight loss</div>
				<div onClick={this.allPlans} style={{height: 100, width: 200, border: '1px solid black', display: 'inline-block'}}>All</div>
				<CommunityList 
					filter={this.state.filter} 
					filterPlans={this.state.filterPlans}
					plans={this.state.plans} 
					showPlan={this.showPlan}
				/>
			</div>
		)
	}
}


export default Community