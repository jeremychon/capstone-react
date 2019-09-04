import React from 'react'

class CreatePlan extends React.Component {
	constructor() {
		super()

		this.state = {
			goalType: '',
			current: 0,
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

	handleSubmit = (e) => {
		e.preventDefault()

		console.log('created plan');
	}


	render() {
		console.log(this.state, '<----- state in CreatePlan');
		return (
			<div>
				<h1>Create Plan</h1>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						name="goalType" 
						placeholder="Weight loss or Strength" 
						value={this.state.goalType}
						onChange={this.handleChange}
					/><br />
					<input 
						type="number" 
						name="current" 
						placeholder="Current Total" 
						value={this.state.current}
						onChange={this.handleChange}
					/><br />
					<input 
						type="number" 
						name="goal" 
						placeholder="Goal Total" 
						value={this.state.goal}
						onChange={this.handleChange}
					/><br />
					Public?
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