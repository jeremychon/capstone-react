import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class CreateSets extends React.Component {
	constructor() {
		super()

		this.state = {
			exerciseId: '',
			weight: '',
			reps: '',
			notes: ''
		}
	}

	componentDidMount() {
		this.setState({exerciseId: this.props.exerciseId})
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.addSet(this.state)
	}

	render() {
		// console.log(this.state, '<---- state in create sets');
		return (
			<div style={{position: 'relative'}}>
				<Form onSubmit={this.handleSubmit}>
					Weight: <Form.Input 
						type="number" 
						name='weight' 
						value={this.state.weight} 
						placeholder='Weight'
						onChange={this.handleChange}
					/>
					Reps: <Form.Input 
						type="number" 
						name='reps' 
						value={this.state.reps} 
						placeholder='# of reps'
						onChange={this.handleChange}
					/>
					Notes: <Form.TextArea 
						name='notes' 
						value={this.state.notes}
						onChange={this.handleChange}
					/>
					<Button>Done</Button>
				</Form>
			</div>
		)
	}
}


export default CreateSets


