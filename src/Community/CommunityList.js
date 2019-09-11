import React from 'react'
import { Card, Icon, Grid } from 'semantic-ui-react'


const CommunityList = (props) => {
	
	const filteredPlans = props.filterPlans.map((plan) => {

		return (
			<Card
				key={plan._id}
				className='plan-card'
				onClick={props.showPlan.bind(null, plan._id)}
			>
				<Card.Content>
					<Card.Header>{plan.user.firstName} {plan.user.lastName}</Card.Header>
					{plan.goalType === 'Weight loss' ? 
						<Card.Description>
							{plan.current} <Icon name='angle double right'/> {plan.goal}
						</Card.Description>
					: <Card.Description>Purpose: {plan.purpose}</Card.Description>}
				</Card.Content>
			</Card>

		)
	})

	const allPlans = props.plans.map((plan) => {

		return (
			<Card
				key={plan._id}
				className='plan-card'
				onClick={props.showPlan.bind(null, plan._id)}
			>
				<Card.Content>
					<Card.Header>{plan.user.firstName} {plan.user.lastName}</Card.Header>
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
			{props.filter ? 
				<Grid className='community-plans-list' doubling columns={5}>{filteredPlans}</Grid> : 
				<Grid className='community-plans-list' doubling columns={5}>{allPlans}</Grid>
			}
		</div>
	)
}



export default CommunityList