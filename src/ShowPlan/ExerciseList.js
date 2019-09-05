import React from 'react'

const ExerciseList = (props) => {

	const allExercises = props.exercises.map((exercise) => {
		return (
			<div key={exercise._id}>
				<div>Type: {exercise.type}</div>
				<div>Activity: {exercise.activity}</div>
				<div>Description: {exercise.description}</div><br />
			</div>
		)
	})

	console.log(allExercises, '<---- allExercises');
	
	return (
		<div>
			<h1>Exercises</h1>
			<div>{allExercises}</div>
		</div>
	)
}




export default ExerciseList