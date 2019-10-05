import React from 'react'
import Register from './Register'
import Login from './Login'
import { Divider } from 'semantic-ui-react'


const SignIn = (props) => {
	return (
		<div className='signin-background'>
			<div className='signIn-title'>
				<div className='signIn-weight-title'>weight</div>
				<div className='signIn-mate-title'>MATE</div>
			</div>
			<div className='signIn-forms'>
				<Login {...props} userLog={props.userLog} />
				<div className='signIn-divider'>
					<Divider vertical style={{color: 'white', fontSize: 20}}>OR</Divider>
				</div>
				<Register {...props} userLog={props.userLog} />
			</div>
		</div>
	)
}




export default SignIn;