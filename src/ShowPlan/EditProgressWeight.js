import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class EditProgressWeight extends React.Component {
	constructor() {
		super()

		this.state = {
			editedWeight: 0
		}
	}

	componentDidMount() {
		this.setState({
			editedWeight: this.props.progressWeight
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.handleProgressWeight(this.state.editedWeight)
	}

	render() {
		// console.log(this.state, '<---- state in EditProgressWeight');
		return (
			<div>
				<Form className='edit-form'>
					<Form.Input
						type="number" 
						name='editedWeight'
						placeholder='New weight'
						value={this.state.editedWeight}
						onChange={this.handleChange}
					/>
					<Button className='progress-buttons' onClick={this.handleSubmit}>Done</Button>
					<Button className='progress-buttons' onClick={this.props.hideProgressModal}>Cancel</Button>
				</Form>
			</div>
		)
	}
}


export default EditProgressWeight