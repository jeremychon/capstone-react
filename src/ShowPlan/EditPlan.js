import React from 'react'
import { Form, Button, Checkbox } from 'semantic-ui-react'

class EditPlan extends React.Component {
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

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.editingPlan(this.state)
	}

	render() {
		console.log(this.state, '<--- state in EditPlan');
		const options = [
			{
				key: this.props.plan.goalType, 
				text: this.props.plan.goalType, 
				value: this.props.plan.goalType
			},
			{
				key: this.props.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss', 
				text: this.props.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss', 
				value: this.props.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss'
			}
		]

		return (
			<div>
				<Form className='edit-form' onSubmit={this.handleSubmit}>
					<Form.Select 
						name="goalType"
						options={options}
						placeholder='Select an option'
						onChange={this.handleChange}
					/>
					{this.state.goalType === 'Weight loss' ? 
						<div className='curr-goal-info'>
							<div className='edit-info'>
								<Form.Input
									className='edit-inputs'
									label='Current'
									type="number" 
									name="current" 
									value={this.state.current}
									onChange={this.handleChange}
								/>
								<label style={{display: 'flex', alignSelf: 'flex-end', marginLeft: 5}}>lbs</label>
							</div>
							<div className='edit-info'>
								<Form.Input
									className='edit-inputs'
									label='Goal'
									type="number" 
									name="goal"  
									value={this.state.goal}
									onChange={this.handleChange}
								/>
								<label style={{display: 'flex', alignSelf: 'flex-end', marginLeft: 5}}>lbs</label>
							</div>
						</div>
					: null}
					{this.state.goalType === 'Strength' ? 
						<div>
							Purpose: 
							<Form.TextArea 
								name="purpose" 
								value={this.state.purpose} 
								onChange={this.handleChange}
							/>
						</div> 
					: null}
					<label>Share?</label>
					<Checkbox
						toggle
						name="public"
						checked={this.state.public}
						onChange={this.handleInputChange}
					/>
					<Button>Update</Button>
				</Form>
			</div>
		)
	}
}



export default EditPlan