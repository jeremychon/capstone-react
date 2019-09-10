import React from 'react'
import { Form, Button } from 'semantic-ui-react'

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
		const options = [
			{key: 'default', text: 'Select an option', value: 'DEFAULT'},
			{key: 'S&C', text: 'Strength & Conditioning', value: 'Strength & Conditioning'},
			{key: 'Cardio', text: 'Cardio', value: 'Cardio'}
		]
		// console.log(this.state, '<---- state in CreateExercise');
		return (
			<div className='createExerciseForm'>
				<Form className='createExerciseInputs' onSubmit={this.props.addExercise.bind(null, this.state)}>
					<Form.Select 
						required 
						options={options}
						name="type" 
						onChange={this.handleChange}
					/>
					<Form.Input
						label='Exercise'
						list="activity" 
						name="activity"
						autoComplete="off" 
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
							<Form.Textarea
								label='Notes: '
								name="description" 
								value={this.state.description} 
								placeholder="e.g. Duration, Distance, etc." 
								onChange={this.handleChange}
							/>
						</div>
					: null}<br />
					<Button>Create</Button>
				</Form>
				<Button style={{marginTop: 10}}>Cancel</Button>
			</div>
		)
	}
}




export default CreateExercise