import React from 'react'

const SetsList = (props) => {
	console.log(props, '<---- props in sets list');

	const allSets = props.sets.map((set, i) => {
		return (
			<div key={set._id}>
				<div>{i + 1}</div>
				<div>Weight: {set.weight}  ||  Reps: {set.reps} || Notes: {set.notes}</div>
			</div>
		)
	})
	
	return (
		<div>
			{allSets}
		</div>
	)
}


export default SetsList