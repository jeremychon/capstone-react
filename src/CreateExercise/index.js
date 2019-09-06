import React from 'react'

class CreateExercise extends React.Component {
	constructor() {
		super()

		this.state = {
			type: '',
			activity: '',
			description: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	render() {
		console.log(this.state, '<---- state in CreateExercise');
		return (
			<div>
				<form onSubmit={this.props.addExercise.bind(null, this.state)}>
					<select name="type" onChange={this.handleChange}>
						<option value="DEFAULT" hidden>Select an Option </option>
						<option value="Strength & Conditioning">Strength & Conditioning</option>
						<option value="Cardio">Cardio</option>
					</select><br />
					<input 
						type="text" 
						name="activity" 
						placeholder="Activity" 
						value={this.state.activity}
						onChange={this.handleChange}
					/><br />
					<textarea  
						name="description" 
						placeholder="e.g. Sets, Reps, Duration, etc." 
						value={this.state.description}
						onChange={this.handleChange}
					/><br />
					<button>Create</button>
				</form>
			</div>
		)
	}
}




export default CreateExercise