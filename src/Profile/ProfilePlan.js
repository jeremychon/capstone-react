import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const ProfilePlan = (props) => {
	const userPlans = props.plans.map((plan) => {
		return (
			<Card 
				key={plan._id} 
				onClick={props.showPlan.bind(null, plan._id)}
			>
				<Card.Content>
					<Card.Header>{plan.goalType}</Card.Header>
					{plan.goalType === 'Weight loss' ? 
						<Card.Description>
							{plan.current} <Icon name='angle double right'/> {plan.goal}
						</Card.Description>
					: <Card.Description>Purpose: {plan.purpose}</Card.Description>}
				</Card.Content>
			</Card>
		)
	})

	return (
		<div>
			<h2 className='profile-page-subtitle'>Plans</h2>
			<div>{userPlans}</div>
		</div>
	)
}



export default ProfilePlan