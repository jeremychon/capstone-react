import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class EditProgressWeight extends React.Component {
	constructor() {
		super()

		this.state = {
			editedWeight: 0
		}
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
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Input
					type="number" 
					name='editedWeight'
					placeholder='New weight'
					value={this.state.editedWeight}
					onChange={this.handleChange}
				/>
				<Button>Done</Button>
			</Form>
		)
	}
}


export default EditProgressWeight