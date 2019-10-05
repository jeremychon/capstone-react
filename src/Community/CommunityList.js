import React from 'react'
import { Icon, Label } from 'semantic-ui-react'


const CommunityList = (props) => {
	
	const filteredPlans = props.filterPlans.map((plan) => {

		return (
			<div
				key={plan._id}
				className='plan-card'
				onClick={props.showPlan.bind(null, plan._id)}
			>
				<span className='plan-card-user'>{plan.user.firstName} {plan.user.lastName}</span>
				{
					plan.goalType === 'Weight loss' ? 
					<div className='plan-card-info'>
						{plan.current} <Icon name='angle double right'/> {plan.goal}
					</div>
					: <div className='plan-card-info'>{plan.purpose}</div>
				}
				{
					plan.goalType === 'Weight loss' ? 
					<Label as='a' color='red' ribbon>WL</Label> : 
					<Label as='a' color='blue' ribbon> S</Label>
				}
			</div>

		)
	})

	const allPlans = props.plans.map((plan) => {

		return (
			<div
				key={plan._id}
				className='plan-card'
				onClick={props.showPlan.bind(null, plan._id)}
			>
				<span className='plan-card-user'>{plan.user.firstName} {plan.user.lastName}</span>
				{
					plan.goalType === 'Weight loss' ? 
					<div className='plan-card-info'>
						{plan.current} <Icon name='angle double right'/> {plan.goal}
					</div>
					: <div className='plan-card-info'>{plan.purpose}</div>
				}
				{
					plan.goalType === 'Weight loss' ? 
					<Label as='a' color='red' ribbon>WL</Label> : 
					<Label as='a' color='blue' ribbon>S</Label>
				}
			</div>
		)
	})



	return (
		<div>
			{props.filter ? 
				<div className='community-plans-list'>{filteredPlans}</div> : 
				<div className='community-plans-list'>{allPlans}</div>
			}
		</div>
	)
}



export default CommunityList