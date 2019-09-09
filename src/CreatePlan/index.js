import React from 'react'
import { Form, Button } from 'semantic-ui-react'

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
		// console.log(this.state, '<----- state in CreatePlan');
		const goalTypes = [
			{key: 'Weight loss', text: 'Weight loss', value: 'Weight loss' },
			{key: 'Strength', text: 'Strength', value: 'Strength' }
		]

		return (
			<div>
				<h1>Create A Plan</h1>
				<Form onSubmit={this.handleSubmit}>
					<Form.Select 
						name="goalType"
						fluid
						placeholder='Select an option'
						options={goalTypes}
						onChange={this.handleChange} 
					/>
					{this.state.goalType === 'Weight loss' ? 
						<Form.Group>
							<label>Current: </label>
							<Form.Input
								type="number" 
								name="current" 
								value={this.state.current}
								onChange={this.handleChange}
							/> lbs
							<label>Goal: </label>
							<Form.Input
								type="number" 
								name="goal"  
								value={this.state.goal}
								onChange={this.handleChange}
							/> lbs
						</Form.Group>
					: null}
					{this.state.goalType === 'Strength' ? 
						<Form.Group>
							<label>Purpose: </label>
							<Form.TextArea
								label='Purpose'
								name="purpose" 
								value={this.state.purpose} 
								onChange={this.handleChange}
							/>
						</Form.Group>
					: null}
					<Form.Checkbox
						label='Share?'
						// type="checkbox" 
						name="public" 
						checked={this.state.public}
						onChange={this.handleInputChange}
					/>
					<Button>Create</Button>
				</Form>
			</div>
		)
	}
}



export default CreatePlan