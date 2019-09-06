import React from 'react'

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
			<div>
				<h2>Login</h2>
				{this.state.correctLog ? null : <div>Incorrect username and/or password</div>}
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						name="email" 
						placeholder="e.g. example@email.com" 
						value={this.state.email}
						onChange={this.handleChange}
					/><br />
					<input 
						type="password" 
						name="password" 
						placeholder="Enter your password" 
						value={this.state.password}
						onChange={this.handleChange}
					/><br />
					<button>Login</button>
				</form>
			</div>
		)
	}
}



export default Login