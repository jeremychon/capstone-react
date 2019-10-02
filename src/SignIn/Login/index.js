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

		this.props.login(this.state)

		this.setState({correctLog: this.props.correctLog})
	}


	render() {
		return(
			<div className='signIn-form'>
				<h2 className='signIn-titles'>LOGIN</h2>
				<Form error className='reglog-form' onSubmit={this.handleSubmit}>
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
							inverted
							className='login-error'
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