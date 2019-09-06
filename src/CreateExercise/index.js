import React from 'react'

class CreateExercise extends React.Component {
	constructor() {
		super()

		this.state = {
			type: '',
			activity: '',
			sets: [],
			description: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	render() {
		// console.log(this.state, '<---- state in CreateExercise');
		return (
			<div>
				<form onSubmit={this.props.addExercise.bind(null, this.state)}>
					<select required name="type" onChange={this.handleChange}>
						<option value="DEFAULT" hidden>Select an Option </option>
						<option value="Strength & Conditioning">Strength & Conditioning</option>
						<option value="Cardio">Cardio</option>
					</select><br />
					Exercise: <input 
						list="activity" 
						name="activity"  
						value={this.state.activity}
						onChange={this.handleChange}
					/>
					{this.state.type === 'Strength & Conditioning' ? 
						<datalist id="activity">
							<option value="Squat" />
							<option value="Deadlift" />
							<option value="Bench" />
						</datalist>
					: null}
					{this.state.type === 'Cardio' ? 
						<div>
							<datalist id="activity">
								<option value="Run" />
								<option value="Bike" />
								<option value="Swim" />
							</datalist>
							<div>
								Notes: 
								<textarea 
									name="description" 
									value={this.state.description} 
									placeholder="e.g. Duration, Distance, etc." 
									onChange={this.handleChange}
								/>
							</div>
						</div>
					: null}<br />
					<button>Create</button>
				</form>
			</div>
		)
	}
}




export default CreateExercise