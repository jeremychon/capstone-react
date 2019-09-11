import React from 'react'
import EditSet from './EditSet'
import { Card } from 'semantic-ui-react'

const SetsList = (props) => {
	console.log(props, '<---- props in sets list');

	const filterSets = props.sets.filter(set => set.exerciseId === props.exerciseId)
		.map((s, i) => {
			return (
				<Card key={s._id}>
					<Card.Content>
						<Card.Meta>{i + 1}</Card.Meta> 
						<Card.Description> 
							Weight: {s.weight} lbs
						</Card.Description>
						<Card.Description>
							Reps: {s.reps}
						</Card.Description>
						<Card.Description>
							Notes: {s.notes}
						</Card.Description>
					</Card.Content>
					<button onClick={props.deleteSet.bind(null, s)}>Delete</button>
				</Card>
			)
		})
	
	return (
		<Card.Group>
			{filterSets}
		</Card.Group>
	)
}


export default SetsList