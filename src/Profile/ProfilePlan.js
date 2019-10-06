import React from 'react'
import { Icon, Label } from 'semantic-ui-react'

const ProfilePlan = (props) => {
	const userPlans = props.plans.map((plan) => {
		return (
			<div 
				key={plan._id}
				className='profile-plan-card'
				onClick={props.showPlan.bind(null, plan._id)}
			>
				<div>
					{
						plan.goalType === 'Weight loss' ? 
						<div>
							<div className='wl-plan-card-info'>
								{plan.current} <Icon style={{margin: 0}}name='angle double right'/> {plan.goal}
							</div>
							<Label as='a' color='red' ribbon>WL</Label>
						</div>
						: 
						<div>
							<div className='profile-plan-card-title'>Purpose:</div>
							<div className='profile-plan-card-par'>{plan.purpose}</div>
							<Label as='a' color='blue' ribbon> S</Label>
						</div>
					}
				</div>
			</div>
		)
	})

	return (
		<div style={{width: '70%'}}>
			<h2 className='profile-page-subtitle'>Plans</h2>
			<div className='profile-plans-list'>{userPlans}</div>
		</div>
	)
}



export default ProfilePlan