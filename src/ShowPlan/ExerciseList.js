import React from 'react'
import EditPopUp from './EditPopUp'
import SetsList from '../Sets/SetsList'
import CreateSets from '../Sets/CreateSets'
import { Grid, Icon } from 'semantic-ui-react'


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

	// changeEditModal = (setInfo, e) => {
	// 	e.preventDefault()
	// 	if (setInfo === 'weight') {
	// 		this.setState({editWeight: true})
	// 	}

	// 	if (setInfo === 'reps') {
	// 		this.setState({editReps: true})
	// 	}

	// 	if (setInfo === 'notes') {
	// 		this.setState({editNotes: true})
	// 	}
	// }

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

			const undeletedSets = this.state.sets.filter(set => set._id !== deletedSetRes.data._id)

			this.setState({
				sets: undeletedSets
			})

		} catch (err) {
			console.log(err);
		}
	}

	render() {
		// console.log(this.state, '<---- state in exercise list');

		const strExercises = this.props.exercises
			.filter(exercise => exercise.type === 'Strength & Conditioning')
			.map((ex) => {

				return (
					<Grid.Column key={ex._id}>
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
						<Icon name='add circle' onClick={this.changeSetsModal} />
					</Grid.Column>
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
			<div className='exerciseList'>
				<h1 className='show-plan-head'>Exercises</h1>
				<h2 className='show-plan-titles'>S & C</h2>
				<Grid stackable columns={2}>{strExercises}</Grid>
				<h2 className='show-plan-titles'>Cardio</h2>
				<Grid stackable columns={2}>{cardioExercises}</Grid>
			</div>
		)
	}
}


export default ExerciseList


