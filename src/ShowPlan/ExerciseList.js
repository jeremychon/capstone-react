import React from 'react'
import EditPopUp from './EditPopUp'
import SetsList from '../Sets/SetsList'
import CreateSets from '../Sets/CreateSets'


class ExerciseList extends React.Component {
	constructor() {
		super()

		this.state = {
			strengthEx: [],
			cardioEx: [],
			creatingSets: false,
			addedSet: {}
		}
	}

	changeSetsModal = () => {
		this.setState({creatingSets: true})
	}

	addSet = (set) => {
		this.setState({
			addedSet: set,
			creatingSets: false
		})
	}

	render() {
		console.log(this.state, '<---- state in exercise list');
		const strExercises = this.props.exercises
			.filter(exercise => exercise.type === 'Strength & Conditioning')
			.map((ex) => {

				if (this.state.addedSet.reps) {
					ex.sets.push(this.state.addedSet)
				}

				return (
					<div key={ex._id}>
						<br/>
						<div>Exercise Type: {ex.type}</div>
						<div>Activity: {ex.activity}</div>
						{this.props.userId === this.props.planUserId ? 
							<div>
								<EditPopUp updateExercise={this.props.updateExercise} exercise={ex}/>
								<button 
									onClick={this.props.deleteExercise.bind(null, ex._id)}
								>Delete</button> 
							</div>
							: null}
						<SetsList sets={ex.sets} />
						{this.state.creatingSets ? <CreateSets addSet={this.addSet}/> : null}
						<button onClick={this.changeSetsModal}>Add Set</button>
					</div>
				)
			})

		const cardioExercises = this.props.exercises
			.filter(exercise => exercise.type === 'Cardio')
			.map((ex) => {
				return (
					<div key={ex._id}>
						<br/>
						<div>Type: {ex.type}</div>
						<div>Activity: {ex.activity}</div>
						<div>Notes: {ex.description}</div>
						{this.props.userId === this.props.planUserId ?
							<div> 
								<EditPopUp updateExercise={this.props.updateExercise} exercise={ex}/> 
								<button 
								onClick={this.props.deleteExercise.bind(null, ex._id)}
							>Delete</button>
							</div>
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
}




export default ExerciseList