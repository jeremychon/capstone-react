import React from 'react'

class ShowPlan extends React.Component {
	constructor() {
		super()

		this.state = {
			editing: false,
			plan: {},
			goalType: '',
			current: '',
			goal:'',
			public: false
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
			plan: foundPlanResponse.data,
			goalType: foundPlanResponse.data.goalType
		})
	}

	editingToggle = (e) => {
		e.preventDefault()

		this.setState({editing: true})
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleInputChange = (e) => {
		this.setState({
			public: e.currentTarget.checked ? true : false
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const updatedPlan = await fetch('http://localhost:9000/plan/' + this.state.plan._id, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				goalType: this.state.goalType,
				current: parseInt(this.state.current),
				goal: parseInt(this.state.goal),
				public: this.state.public
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (updatedPlan.status !== 200) {
			throw Error('updatedPlan is not running')
		}

		const updatedPlanResponse = await updatedPlan.json()
		console.log(updatedPlanResponse, '<---- updatedPlanResponse');

		this.setState({
			editing: false,
			plan: updatedPlanResponse.data
		})
	}

	render() {
		console.log(this.state, '<---- this.state in ShowPlan');
		return (
			<div>
				<h1>Show Plan</h1>
					{this.state.editing ? null : 
						<div>
						<div>{this.state.plan.goalType}</div>
						<div>{this.state.plan.current}</div>
						<div>{this.state.plan.goal}</div>
						{this.state.plan.user === this.props.userId ? <button onClick={this.editingToggle}>Edit</button> : null}
						{this.state.plan.user === this.props.userId ? <button>Delete</button> : null}
						</div>
					}

					{this.state.editing ? 
						<form onSubmit={this.handleSubmit}>
							<select name="goalType" onChange={this.handleChange}>
								<option defaultValue={this.state.goalType}>{this.state.plan.goalType}</option>
								<option value={this.state.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss'}>{this.state.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss'}</option>
							</select>
							<input 
								type="number" 
								name="current" 
								value={this.state.current} 
								placeholder={this.state.plan.current} 
								onChange={this.handleChange}
							/>
							<input 
								type="number" 
								name="goal" 
								value={this.state.goal} 
								placeholder={this.state.plan.goal} 
								onChange={this.handleChange}
							/>
							Share?
							<input 
								type="checkbox"
								name="public"
								checked={this.state.public}
								onChange={this.handleInputChange}
							/>
							<button>Update</button>
						</form> 
						: null
					}
			</div>
		)
	}
}



export default ShowPlan