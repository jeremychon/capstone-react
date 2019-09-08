import React from 'react'


const CommunityList = (props) => {
	
	const filteredPlans = props.filterPlans.map((plan) => {

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
				<div>Created by: {plan.user.firstName} {plan.user.lastName}</div>
				
				<br />
			</div>
		)
	})

	const allPlans = props.plans.map((plan) => {

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
				<div>Created by: {plan.user.firstName} {plan.user.lastName}</div><br />
			</div>
		)
	})



	return (
		<div>
			{props.filter ? <div>{filteredPlans}</div> : <div>{allPlans}</div>
			}
		</div>
	)
}



export default CommunityList