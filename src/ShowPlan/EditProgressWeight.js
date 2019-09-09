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
		return (
			<div>
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
				<Button onClick={this.props.hideProgressModal}>Cancel</Button>
			</div>
		)
	}
}


export default EditProgressWeight