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

	handleChange = (e, { name, value }) => {
		this.setState({
			[name]: value
		})
	}

	render() {
		const options = [
			{key: 'Strength & Conditioning', text: 'Strength & Conditioning', value: 'Strength & Conditioning'},
			{key: 'Cardio', text: 'Cardio', value: 'Cardio'}
		]
		console.log(this.state, '<---- state in CreateExercise');
		return (
			<div className='create-exercise-form'>
				<Form className='create-exercise-inputs'>
					<Form.Select 
						required 
						options={options}
						name="type" 
						onChange={this.handleChange}
						placeholder='Select an option'
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
							<Form.TextArea
								label='Notes: '
								name="description" 
								value={this.state.description} 
								placeholder="e.g. Duration, Distance, etc." 
								onChange={this.handleChange}
							/>
						</div>
					: null}
					<div className='create-exercise-button-group'>
						<button 
							onClick={this.props.addExercise.bind(null, this.state)}
							className='create-exercise-button'
						>Create</button>
						<button 
							onClick={this.props.hideCreateExercise}
							className='create-exercise-button'
						>Cancel</button>
					</div>
				</Form>
			</div>
		)
	}
}




export default CreateExercise