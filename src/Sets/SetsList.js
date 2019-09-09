import React from 'react'
import EditSet from './EditSet'

const SetsList = (props) => {
	console.log(props, '<---- props in sets list');

	const filterSets = props.sets.filter(set => set.exerciseId === props.exerciseId)
		.map((s, i) => {
			return (
				<div key={s._id}>
					<div>{i + 1}</div>
					{props.editWeight ? <EditSet editWeight/> : 
						<div onClick={props.changeEditModal.bind(null, 'weight')}> 
							Weight: {s.weight} lbs
						</div>
					}
					{props.editReps ? <EditSet reps='reps'/> : 
						<div onClick={props.changeEditModal.bind(null, 'reps')}>
							Reps: {s.reps}
						</div>
					}
					{props.editNotes ? <EditSet notes='notes'/> : 
						<div onClick={props.changeEditModal.bind(null, 'notes')}>
							Notes: {s.notes}
						</div>
					}
					<button onClick={props.deleteSet.bind(null, s)}>Delete</button>
				</div>
			)
		})
	
	return (
		<div>
			{filterSets}
		</div>
	)
}


export default SetsList