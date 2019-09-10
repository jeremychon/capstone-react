import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

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

	handleChange = (e, { name, value }) => {
		this.setState({
			[name]: value
		})
	}

	handleInputChange = (e, { checked }) => {
		this.setState({
			public: checked ? true : false
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const createdPlan = await fetch(process.env.REACT_APP_BACKEND_URL + '/plan/', {
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
		const options = [
			{key: 'wl', text: 'Weight loss', value: 'Weight loss' },
			{key: 'str', text: 'Strength', value: 'Strength' }
		]

		return (
			<div>
				<Form className='create-plan' onSubmit={this.handleSubmit}>
					<Form.Select
						className='create-plan-select'
						name="goalType"
						placeholder='Select a goal'
						options={options}
						onChange={this.handleChange} 
					/>
					{this.state.goalType === 'Weight loss' ? 
						<Form.Group className='wl-inputs'>
							<Form.Input
								className='wl-field'
								label='Current'
								type="number" 
								name="current" 
								value={this.state.current}
								onChange={this.handleChange}
							/>
							<label className='lbs'>lbs</label>
							<Icon className='cur-to-goal' name='long arrow alternate right'/>
							<Form.Input
								className='wl-field'
								label='Goal'
								type="number" 
								name="goal"  
								value={this.state.goal}
								onChange={this.handleChange}
							/>
							<label className='lbs'>lbs</label>
						</Form.Group>
					: null}
					{this.state.goalType === 'Strength' ? 
							<Form.TextArea
								className='str-textarea'
								label='Purpose'
								name='purpose'
								placeholder='e.g. for a sport, new to lifting, need advice, be in better shape'
								value={this.state.purpose} 
								onChange={this.handleChange}
							/>
					: null}
					<Form.Group className='create-plan-share'>
						<label>Share?</label>
						<Form.Checkbox 
							name="public" 
							checked={this.state.public}
							onChange={this.handleInputChange}
						/>
					</Form.Group>
					
					{this.state.goalType ? <Button>Create</Button> : null}
				</Form>
			</div>
		)
	}
}



export default CreatePlan