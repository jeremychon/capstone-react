import React from 'react'


const CommunityList = (props) => {
	
	const filteredPlans = props.filterPlans.map((plan) => {
		return (
			<div key={plan._id}>
				<div>{plan.goalType}</div>
				<div>{plan.current}</div>
				<div>{plan.goal}</div><br />
			</div>
		)
	})

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
			{props.filter ? <div>{filteredPlans}</div> : <div>{allPlans}</div>
			}
		</div>
	)
}



export default CommunityList