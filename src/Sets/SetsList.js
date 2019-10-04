import React from 'react'
import EditSet from './EditSet'
import { Card } from 'semantic-ui-react'

const SetsList = (props) => {
	console.log(props, '<---- props in sets list');

	const filterSets = props.sets.filter(set => set.exerciseId === props.exerciseId)
		.map((s, i) => {
			return (
				<div key={s._id} className='set'>
					<div style={{width: '10%'}}>{i + 1}</div>
					<div className='set-info'>
						<div>Weight: {s.weight} lbs</div>
						<div>Reps: {s.reps}</div>
						<div>Notes: {s.notes}</div>
					</div>
					<button 
						onClick={props.deleteSet.bind(null, s)}
						className='delete-set-button'
					>-</button>
				</div>
			)
		})
	
	return (
		<div className='sets-list'>
			{filterSets}
		</div>
	)
}


export default SetsList