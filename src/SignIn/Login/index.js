import React from 'react'
import { Button, Form, Message } from 'semantic-ui-react'

class Login extends React.Component {
	constructor() {
		super()

		this.state = {
			email: '',
			password: '',
			correctLog: true
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const login = await fetch('http://localhost:9000/user/login', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const parsedLogin = await login.json()

		if (parsedLogin.code === 200) {
			console.log('User is logged in');
			this.props.userLog(parsedLogin.data.firstName, parsedLogin.data.lastName, parsedLogin.data._id)
			this.props.history.push('/community')
		} else {
			this.setState({correctLog: false})

		}
	}


	render() {
		return(
			<div className='signInForm'>
				<h2 className='signInTitles'>LOGIN</h2>
				<Form error className='reglogForm' onSubmit={this.handleSubmit}>
					<Form.Input 
						type="text" 
						name="email" 
						placeholder="e.g. example@email.com" 
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<Form.Input 
						type="password" 
						name="password" 
						placeholder="Enter your password" 
						value={this.state.password}
						onChange={this.handleChange}
					/>
					{this.state.correctLog ? null : 
						<Message
							className='loginError'
							error
							header='Incorrect email or password'
							content={`Register for a new account if you don't already have one.`}
						/>
					}
					<Button>Login</Button>
				</Form>
			</div>
		)
	}
}



export default Login