import React from 'react'

const ExerciseList = (props) => {

	const strExercises = props.exercises
		.filter(exercise => exercise.type === 'Strength & Conditioning')
		.map((ex) => {
			return (
				<div key={ex._id}>
					<br/>
					<div>Type: {ex.type}</div>
					<div>Activity: {ex.activity}</div>
					<div>Description: {ex.description}</div>
					{props.userId === props.planUserId ? 
						<button>Edit</button> 
						: null}
					{props.userId === props.planUserId ? 
						<button 
							onClick={props.deleteExercise.bind(null, ex._id)}
						>Delete</button> 
						: null}
				</div>
			)
		})

	const cardioExercises = props.exercises
		.filter(exercise => exercise.type === 'Cardio')
		.map((ex) => {
			return (
				<div key={ex._id}>
					<br/>
					<div>Type: {ex.type}</div>
					<div>Activity: {ex.activity}</div>
					<div>Description: {ex.description}</div>	
					{props.userId === props.planUserId ? 
						<button>Edit</button> 
						: null}
					{props.userId === props.planUserId ? 
						<button 
							onClick={props.deleteExercise.bind(null, ex._id)}
						>Delete</button> 
						: null}
				</div>
			)
		})
	
	return (
		<div>
			<h1>Exercises</h1>
			<h2>S & C</h2>
			<div>{strExercises}</div>
			<h2>Cardio</h2>
			<div>{cardioExercises}</div>
		</div>
	)
}




export default ExerciseList