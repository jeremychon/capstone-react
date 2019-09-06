import React from 'react'

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
			<div>
				<h2>Register</h2>
				{this.state.userExists ? <div>A user with that email already exists</div> : null}
				<form onSubmit={this.handleSubmit}>
					<input 
						type='text' 
						name='firstName' 
						placeholder='First name' 
						value={this.state.firstName}
						onChange={this.handleChange}
					/><br />
					<input 
						type='text' 
						name='lastName' 
						placeholder='Last name' 
						value={this.state.lastName}
						onChange={this.handleChange} 
					/><br />
					<input 
						type='text' 
						name='email' 
						placeholder='e.g. example@email.com' 
						value={this.state.email}
						onChange={this.handleChange} 
					/><br />
					<input 
						type='password' 
						name='password' 
						placeholder='Enter a password' 
						value={this.state.password}
						onChange={this.handleChange} 
					/><br />
					<button>Register</button>
				</form>
			</div>
		)
	}
}



export default Register