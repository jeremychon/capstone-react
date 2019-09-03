import React from 'react'

class Register extends React.Component {
	constructor() {
		super()

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
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
		console.log(parsedRegister, '<---- parsedRegister');

		if (parsedRegister.code === 200) {
			console.log('logged in');
			this.props.userLog(parsedRegister.data.firstName, parsedRegister.data.lastName)
		} else {
			console.log('A user with that email already exists');
		}
	}


	render() {
		console.log(this.state, '<---- this.state in Register');
		return (
			<div>
				<h2>Register</h2>
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