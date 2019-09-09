import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

class Register extends React.Component {
	constructor() {
		super()

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			image: {},
			userExists: false
		}
	}

	handleChange = (e) => {
		if (e.currentTarget.name !== 'image') {
			this.setState({
				[e.currentTarget.name]: e.currentTarget.value
			})
		} else {
			this.setState({
				image: e.currentTarget.files[0]
			})
		}
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const data = new FormData();
		data.append('profPic', this.state.image)
		data.append('firstName', this.state.firstName)
		data.append('lastName', this.state.lastName)
		data.append('email', this.state.email)
		data.append('password', this.state.password)
		
		// for (let pair of data.entries()) {
		// 	console.log(pair[0], ', ', pair[1]);
		// }

		const registerCall = this.props.register(data)
		console.log(registerCall, '<---- registerCall');
	}


	render() {
		return (
			<div className='signInForm'>
				<h2 className='signInTitles'>REGISTER</h2>
				<Form error className='reglogForm' onSubmit={this.handleSubmit}>
					<Form.Input 
						type='text' 
						name='firstName' 
						placeholder='First name' 
						value={this.state.firstName}
						onChange={this.handleChange}
					/>
					<Form.Input 
						type='text' 
						name='lastName' 
						placeholder='Last name' 
						value={this.state.lastName}
						onChange={this.handleChange} 
					/>
					<Form.Input
						iconPosition='left'
						icon='mail'
						type='text' 
						name='email' 
						placeholder='e.g. example@email.com' 
						value={this.state.email}
						onChange={this.handleChange} 
					/>
					<Form.Input
						iconPosition='left'
						icon='lock'
						type='password' 
						name='password' 
						placeholder='Enter a password' 
						value={this.state.password}
						onChange={this.handleChange} 
					/>
					<Form.Input
						iconPosition='left'
						icon='image'
						type='file'
						name='image'
						onChange={this.handleChange}
					/>
					{this.state.userExists ? 
						<Message
						className='registerError'
							error
							header='User Already Exists'
							content='A user with that email is already registered.'
						/> 
					: null}
					<Button>Register</Button>
				</Form>
			</div>
		)
	}
}



export default Register