import React from 'react'


const CommunityList = (props) => {
	
	const allPlans = props.plans.map((plan) => {
		return (
			<div key={plan._id}>
				<div>{plan.goalType}</div>
				<div>{plan.current}</div>
				<div>{plan.goal}</div><br />
			</div>
		)
	})
	

	return (
		<div>
			<h3>All Plans</h3>
			<div>{allPlans}</div>
		</div>
	)
}



export default CommunityList