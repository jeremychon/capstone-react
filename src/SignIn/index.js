import React from 'react'
import Register from './Register'
import Login from './Login'


const SignIn = (props) => {
	return (
		<div>
			<h1>Sign In Page</h1>
			<Register {...props} userLog={props.userLog} />
			<Login {...props} userLog={props.userLog} />
		</div>
	)
}




export default SignIn;