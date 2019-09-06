import React from 'react'

class CreatePlan extends React.Component {
	constructor() {
		super()

		this.state = {
			goalType: '',
			current: 0,
			squat: 0,
			deadlift: 0,
			bench: 0,
			goal: 0,
			public: false
		}
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

		try {
			const createdPlan = await fetch('http://localhost:9000/plan/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (createdPlan.status !== 200) {
				throw Error('createdPlan is not running')
			}

			const createdPlanResponse = await createdPlan.json()
			console.log(createdPlanResponse, '<---- createdPlanResponse');

			this.props.history.push('/plan/' + createdPlanResponse.data._id)

		} catch (err) {
			console.log(err);
		}
	}


	render() {
		console.log(this.state, '<----- state in CreatePlan');
		return (
			<div>
				<h1>Create Plan</h1>
				<form onSubmit={this.handleSubmit}>
					<select name="goalType" onChange={this.handleChange}>
						<option value="DEFAULT" hidden>Select an Option </option>
						<option value="Weight loss">Weight loss</option>
						<option value="Strength">Strength</option>
					</select><br />
					<input 
						type="number" 
						name="current" 
						placeholder="Current Total" 
						value={this.state.current}
						onChange={this.handleChange}
					/><br />
					{this.state.goalType === 'Strength' ? 
						<div>
							<input type="number" name='squat' value={this.state.squat}/> lbs
							<input type="number" name='deadlift' value={this.state.deadlift}/> lbs
							<input type="number" name='bench' value={this.state.bench}/> lbs
						</div>
					: null}
					<input 
						type="number" 
						name="goal" 
						placeholder="Goal Total" 
						value={this.state.goal}
						onChange={this.handleChange}
					/><br />
					Share?
					<input 
						type="checkbox" 
						name="public" 
						checked={this.state.public}
						onChange={this.handleInputChange}
					/><br />
					<button>Create</button>
				</form>
			</div>
		)
	}
}



export default CreatePlan