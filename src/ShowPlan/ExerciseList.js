import React from 'react'
import EditPopUp from './EditPopUp'
import SetsList from '../Sets/SetsList'
import CreateSets from '../Sets/CreateSets'


class ExerciseList extends React.Component {
	constructor() {
		super()

		this.state = {
			creatingSets: false,
			addedSet: {},
			deletedSet: {},
			sets: [],
			editWeight: false,
			editReps: false,
			editNotes: false
		}
	}

	componentDidMount() {
		this.getSets()
	}

	getSets = async () => {
		try {
			const allSets = await fetch('http://localhost:9000/set/', {
				method: 'GET',
				credentials: 'include'
			})

			if (allSets.status !== 200) {
				throw Error('allSets is not running')
			}

			const allSetsRes = await allSets.json()

			this.setState({sets: allSetsRes.data})
		} catch (err) {
			console.log(err);
		}
	}

	changeEditModal = (setInfo, e) => {
		e.preventDefault()
		console.log(setInfo, '<---- setInfo --- hitting changeEditModal');
		if (setInfo === 'weight') {
			this.setState({editWeight: true})
		}

		if (setInfo === 'reps') {
			this.setState({editReps: true})
		}

		if (setInfo === 'notes') {
			this.setState({editNotes: true})
		}
	}

	changeSetsModal = () => {
		this.setState({creatingSets: true})
	}

	addSet = async (set) => {
		try {
			const createdSet = await fetch('http://localhost:9000/set/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(set),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (createdSet.status !== 200) {
				throw Error('createdSet is not running')
			}

			const createdSetRes = await createdSet.json()

			this.setState({
				sets: [...this.state.sets, createdSetRes.data],
				creatingSets: false
			})

		} catch (err) {
			console.log(err);
		}
	}

	deleteSet = async (set) => {
		try {
			const deletedSet = await fetch('http://localhost:9000/set/' + set._id, {
				method: 'DELETE',
				credentials: 'include'
			})

			if (deletedSet.status !== 200) {
				throw Error('deletedSet is not running')
			}

			const deletedSetRes = await deletedSet.json()
			console.log(deletedSetRes, '<---- deletedSetRes');

			const undeletedSets = this.state.sets.filter(set => set._id !== deletedSetRes.data._id)
			console.log(undeletedSets, '<---- undeletedSets');

			this.setState({
				sets: undeletedSets
			})

		} catch (err) {
			console.log(err);
		}
	}

	// updateSet = async (set) => {
	// 	try {
			
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	render() {
		console.log(this.state, '<---- state in exercise list');

		const strExercises = this.props.exercises
			.filter(exercise => exercise.type === 'Strength & Conditioning')
			.map((ex) => {

				return (
					<div key={ex._id}>
						<br/>
						<div>Activity: {ex.activity}</div>
						{this.props.userId === this.props.planUserId ? 
							<div>
								<EditPopUp updateExercise={this.props.updateExercise} exercise={ex}/>
								<div 
									onClick={this.props.deleteExercise.bind(null, ex._id)}
								>&times;</div> 
							</div>
							: null}
						<SetsList 
							exerciseId={ex._id} 
							sets={this.state.sets}
							deleteSet={this.deleteSet}
							changeEditModal={this.changeEditModal}
							editWeight={this.state.editWeight}
							editReps={this.state.editReps}
							editNotes={this.state.editNotes}
						/>
						{this.state.creatingSets ? <CreateSets exerciseId={ex._id} addSet={this.addSet}/> : null}
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


