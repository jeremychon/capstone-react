import React from 'react'
import Popup from 'reactjs-popup'
import { Form, Button } from 'semantic-ui-react'

class EditPopUp extends React.Component {
	constructor() {
		super()

		this.state = {
			id: '',
			type: '',
			activity: '',
			description: '',
			open: false
		}
	}

	componentDidMount() {
		this.setState({
			id: this.props.exercise._id,
			type: this.props.exercise.type,
			activity: this.props.exercise.activity,
			description: this.props.exercise.description
		})
	}

	openModal = () => {
		this.setState({open: true})
	}

	closeModal = () => {
		this.setState({open: false})
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.updateExercise(this.state)

		this.setState({open: false})
	}
	
	render() {
		// console.log(this.state, '<--- state in edit pop up');
		const options = [
			{key: 'Strength & Conditioning', text: 'Strength & Conditioning', value: 'Strength & Conditioning'},
			{key: 'Cardio', text: 'Cardio', value: 'Cardio'}
		]
		return (
			<div>
				<Button onClick={this.openModal} >Edit</Button>
				<Popup 
					open={this.state.open}
					closeOnDocumentClick
					onClose={this.closeModal}
				>
					<Form onSubmit={this.handleSubmit}>
						<Form.Select
							placeholder='Select an option'
							options={options}
							name="type" 
							onChange={this.handleChange}
						/>
						Exercise: <Form.Input 
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
								<div>
									Notes: 
									<Form.TextArea 
										name="description" 
										value={this.state.description}  
										onChange={this.handleChange}
									/>
								</div>
							</div>
						: null}<br />
						<Button>Update</Button>
						<Button onClick={this.closeModal}>Cancel</Button>
					</Form>
				</Popup>
			</div>
		)
	}
}


export default EditPopUp