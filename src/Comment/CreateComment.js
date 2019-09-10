import React from 'react'
import { Form, Button } from 'semantic-ui-react'

class CreateComment extends React.Component {
	constructor() {
		super()

		this.state = {
			comment: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.addComment(this.state)

		this.setState({comment: ''})
	}

	render() {
		// console.log(this.state, '<--- state in create comment');
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Form.TextArea 
						type='text' 
						name='comment'
						placeholder='Add a comment...'
						value={this.state.comment} 
						onChange={this.handleChange}
					/>
					<Button>Add Comment</Button>
				</Form>
			</div>
		)
	}
}


export default CreateComment