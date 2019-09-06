import React from 'react'

const ProfilePlan = (props) => {
	const userPlans = props.plans.map((plan) => {
		return (
			<div 
				key={plan._id} 
				style={{border: '1px solid black', display: 'inline-block', width: 100}}
			>
				<div>{plan.goalType}</div>
				<div>{plan.current}</div>
				<div>{plan.goal}</div>
				<br />
			</div>
		)
	})

	return (
		<div>
			<h2>Plans</h2>
			<div>{userPlans}</div>
		</div>
	)
}



export default ProfilePlan