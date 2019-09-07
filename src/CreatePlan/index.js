import React from 'react'

class CreatePlan extends React.Component {
	constructor() {
		super()

		this.state = {
			goalType: '',
			current: 0,
			goal: 0,
			purpose: '',
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
		
		const { squat, deadlift, bench } = this.state
		this.props.updateLifts(squat, deadlift, bench)

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
					{this.state.goalType === 'Weight loss' ? 
						<div>
							Current: <input 
								type="number" 
								name="current" 
								value={this.state.current}
								onChange={this.handleChange}
							/> lbs <br />
							Goal: <input 
								type="number" 
								name="goal"  
								value={this.state.goal}
								onChange={this.handleChange}
							/> lbs <br />
						</div>
					: null}
					{this.state.goalType === 'Strength' ? 
						<div>
							Purpose: 
							<textarea 
								name="purpose" 
								value={this.state.purpose} 
								onChange={this.handleChange}
							/>
						</div> 
					: null}
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