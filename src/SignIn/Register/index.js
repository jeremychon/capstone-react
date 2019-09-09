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
			userExists: false
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const register = await fetch('http://localhost:9000/user/register', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const parsedRegister = await register.json();

		if (parsedRegister.code === 200) {
			console.log('logged in');
			this.props.userLog(parsedRegister.data.firstName, parsedRegister.data.lastName, parsedRegister.data._id)
			this.props.history.push('/community')
		} else {
			this.setState({userExists: true})
		}
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
						type='text' 
						name='email' 
						placeholder='e.g. example@email.com' 
						value={this.state.email}
						onChange={this.handleChange} 
					/>
					<Form.Input 
						type='password' 
						name='password' 
						placeholder='Enter a password' 
						value={this.state.password}
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