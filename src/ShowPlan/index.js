import React from 'react'

class ShowPlan extends React.Component {
	constructor() {
		super()

		this.state = {
			plan: {}
		}
	}

	componentDidMount() {
		this.getPlan()
	}

	getPlan = async () => {
		const { id } = this.props.match.params

		const foundPlan = await fetch('http://localhost:9000/plan/' + id, {
			method: 'GET',
			credentials: 'include'
		})
		console.log(foundPlan, '<---- foundPlan');

		if (foundPlan.status !== 200) {
			throw Error('foundPlan is not running');
		}

		const foundPlanResponse = await foundPlan.json()

		this.setState({
			plan: foundPlanResponse.data
		})
	}

	render() {
		console.log(this.state, '<---- this.state in ShowPlan');
		return (
			<div>
				<h1>Show Plan</h1>
				<div>
					<div>{this.state.plan.goalType}</div>
					<div>{this.state.plan.current}</div>
					<div>{this.state.plan.goal}</div>
				</div>
			</div>
		)
	}
}



export default ShowPlan