import React from 'react'
import Register from './Register'
import Login from './Login'
import { Divider } from 'semantic-ui-react'


const SignIn = (props) => {
	return (
		<div className='signInBackground'>
			<div className='signInTitle'>
				<div className='signInWeightTitle'>weight</div>
				<div className='signInMateTitle'>MATE</div>
			</div>
			<div className='signInForms'>
				<Login {...props} userLog={props.userLog} />
				<div className='signInDivider'>
					<Divider vertical style={{color: 'white', fontSize: 20}}>OR</Divider>
				</div>
				<Register {...props} userLog={props.userLog} />
			</div>
		</div>
	)
}




export default SignIn;