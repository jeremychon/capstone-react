import React from 'react'

const ProfileProgress = (props) => {
	const progress = props.plans.map((plan) => {
		return (
			<div key={plan._id}>
				<div style={{display: 'inline-block', marginRight: 30}}>Type: {plan.goalType}</div>
				<div style={{display: 'inline-block', marginRight: 30}}>Current: {plan.current}</div>
				<div style={{display: 'inline-block', marginRight: 30}}>Goal: {plan.goal}</div><br/>
			</div>
		)
	})
	
	return (
		<div>
			<h2>Progress</h2>
			<div>{progress}</div>
		</div>
	)
}




export default ProfileProgress