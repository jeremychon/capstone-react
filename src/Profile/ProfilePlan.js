import React from 'react'

const ProfilePlan = (props) => {
	const userPlans = props.plans.map((plan) => {
		return (
			<div 
				key={plan._id} 
				style={{border: '1px solid black', display: 'inline-block', width: 100}}
				onClick={props.showPlan.bind(null, plan._id)}
			>
				<div>{plan.goalType}</div>
				{plan.goalType === 'Weight loss' ? 
					<div>
						<div>Current: {plan.current}</div>
						<div>Goal: {plan.goal}</div>
					</div>
				: <div>Purpose: {plan.purpose}</div>}
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