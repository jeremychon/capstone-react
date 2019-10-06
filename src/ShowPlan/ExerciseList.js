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
			sets: []
		}
	}

	componentDidMount() {
		this.getSets()
	}

	getSets = async () => {
		try {
			const allSets = await fetch(process.env.REACT_APP_BACKEND_URL + '/set/', {
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
			const createdSet = await fetch(process.env.REACT_APP_BACKEND_URL + '/set/', {
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
			const deletedSet = await fetch(process.env.REACT_APP_BACKEND_URL + '/set/' + set._id, {
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
		console.log(this.props, '<---- props in exercise list');

		const strExercises = this.props.exercises
			.filter(exercise => exercise.type === 'Strength & Conditioning')
			.map((ex) => {

				return (
					<div key={ex._id} className='exercise-item'>
						<div>
							<div className='exercise-item-activity'>{ex.activity}</div>
						</div>
						{
							this.props.userId === this.props.planUserId ?
							<div className='exercise-button-group'>
								<button
									onClick={this.props.deleteExercise.bind(null, ex._id)}
									className='exercise-button'
								>DELETE</button>
								<EditPopUp
									updateExercise={this.props.updateExercise} 
									exercise={ex}
								/>
							</div> : null
						}
						<SetsList 
							exerciseId={ex._id} 
							sets={this.state.sets}
							deleteSet={this.deleteSet}
							planUserId={this.props.planUserId}
							userId={this.props.userId}
						/>
						{
							this.state.creatingSets ? 
							<div>
								<CreateSets exerciseId={ex._id} addSet={this.addSet}/>
							</div>
							: null
						}
						{
							this.props.userId === this.props.planUserId ? 
							<div 
								className='add-set-button'
								onClick={this.changeSetsModal}
							>+</div> : null
						}
					</div>
				)
			})

		const cardioExercises = this.props.exercises
			.filter(exercise => exercise.type === 'Cardio')
			.map((ex) => {
				return (
					<div key={ex._id} className='exercise-item'>
						<div>
							<div className='exercise-item-activity'>{ex.activity}</div>
							<div>{ex.description}</div>
						</div>
						{
							this.props.userId === this.props.planUserId ?
							<div className='exercise-button-group'>
								<button
									onClick={this.props.deleteExercise.bind(null, ex._id)}
									className='exercise-button'
								>DELETE</button>
								<EditPopUp 
									updateExercise={this.props.updateExercise} 
									exercise={ex}
								/>
							</div>
							: null
						}
					</div>
				)
			})

		return (
			<div className='exerciseList'>
				<h1 className='show-plan-head'>Exercises</h1>
				<div className='show-plan-ex-sections'>
					<h2 className='show-plan-titles'>S & C</h2>
					<div className='all-exercises'>{strExercises}</div>
				</div>
				<div className='show-plan-ex-sections'>
					<h2 className='show-plan-titles'>Cardio</h2>
					<div className='all-exercises'>{cardioExercises}</div>
				</div>
			</div>
		)
	}
}


export default ExerciseList


