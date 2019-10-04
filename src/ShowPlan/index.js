import React from 'react'
import CreateExercise from '../CreateExercise'
import EditPlan from './EditPlan'
import ExerciseList from './ExerciseList'
import EditProgressWeight from './EditProgressWeight'
import Comments from '../Comment'
import { Card, Button, Progress } from 'semantic-ui-react'

class ShowPlan extends React.Component {
	constructor() {
		super()

		this.state = {
			editing: false,
			creatingX: false,
			exercises: [],
			comments: [],
			plan: {},
			// USED FOR EDITING EXERCISES
			type: '',
			activity: '',
			description: '',
			// USED FOR PROGRESS
			progressWeight: 0,
			progressPercent: '',
			progressModal: false
		}
	}

	componentDidMount() {
		this.getPlan()
		this.getExercises()
	}

	showProgressModal = (e) => {
		e.preventDefault()

		this.setState({
			editing: false,
			progressModal: true
		})
	}

	hideProgressModal = (e) => {
		e.preventDefault()

		this.setState({progressModal: false})
	}

	// Changes the weight of the user now and changes the progress bar
	handleProgressWeight = async (weight) => {
		const diffToGoal = this.state.plan.current - this.state.plan.goal
		const progressMade = this.state.plan.current - weight
		const progressPercent = (progressMade / diffToGoal) * 100

		try {
			const updatedPlan = await fetch('http://localhost:9000/plan/' + this.state.plan._id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify({
					goalType: this.state.goalType,
					current: this.state.current,
					goal: this.state.goal,
					progressWeight: weight,
					progressPercent: Math.floor(progressPercent)
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (updatedPlan.status !== 200) {
				throw Error('updatedPlan is not running')
			}

			const updatedPlanRes = await updatedPlan.json()

			this.setState({
				plan: updatedPlanRes.data,
				progressModal: false,
				progressWeight: weight,
				progressPercent: progressPercent
			})
		} catch (err) {
			console.log(err);
		}
	}


	// ================= GET ALL PLANS ================= //

	getPlan = async () => {
		const { id } = this.props.match.params

		const foundPlan = await fetch(process.env.REACT_APP_BACKEND_URL + '/plan/' + id, {
			method: 'GET',
			credentials: 'include'
		})

		if (foundPlan.status !== 200) {
			throw Error('foundPlan is not running');
		}

		const foundPlanResponse = await foundPlan.json()

		this.setState({
			plan: foundPlanResponse.plan,
			goalType: foundPlanResponse.plan.goalType,
			current: foundPlanResponse.plan.current,
			goal: foundPlanResponse.plan.goal,
			purpose: foundPlanResponse.plan.purpose,
			comments: foundPlanResponse.comments
		})
	}

	// ================= GET ALL EXERCISES ================= //

	getExercises = async () => {
		const { id } = this.props.match.params

		const allExercises = await fetch(process.env.REACT_APP_BACKEND_URL + '/exercise/', {
			method: 'GET',
			credentials: 'include'
		})

		if (allExercises.status !== 200) {
			throw Error('allExercises is not running')
		}

		const allExercisesResponse = await allExercises.json()

		const planExercises = allExercisesResponse.data.filter(exercise => exercise.planId === id)

		this.setState({exercises: planExercises})
	}

	// ===== DETERMINE IF I'M EDITING OR CREATING ===== //

	editingToggle = (e) => {
		e.preventDefault()

		this.setState({
			editing: true,
			progressModal: false
		})
	}

	creatingToggle = (e) => {
		e.preventDefault()

		this.setState({creatingX: true})
	}

	hideCreateExercise = (e) => {
		e.preventDefault()

		this.setState({creatingX: false})
	}

	// ================= CREATE EXERCISE ================= //

	addExercise = async (exercise, e) => {
		e.preventDefault()

		try {
			exercise.planId = this.state.plan._id

			const addedExercise = await fetch(process.env.REACT_APP_BACKEND_URL + '/exercise/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(exercise),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (addedExercise.status !== 200) {
				throw Error('createdExercise is not running')
			}

			const addedExerciseResponse = await addedExercise.json()

			this.setState({
				exercises: [...this.state.exercises, addedExerciseResponse.data],
				creatingX: false
			})
			
		} catch (err) {
			console.log(err);
		}
	}

	// ================= DELETE EXERCISE ================= //

	deleteExercise = async (exerciseId, e) => {

		try {
			const deletedExercise = await fetch(process.env.REACT_APP_BACKEND_URL + '/exercise/' + exerciseId, {
				method: 'DELETE',
				credentials: 'include'
			})

			if (deletedExercise.status !== 200) {
				throw Error('deletedExercise is not running')
			}

			const deletedExerciseResponse = await deletedExercise.json()

			const undeletedExercises = this.state.exercises.filter(exercise => exercise._id !== deletedExerciseResponse.data._id)

			this.setState({
				exercises: undeletedExercises
			})

		} catch (err) {
			console.log(err);
		}
		
	}

	// ================= EDIT EXERCISE ================= //

	updateExercise = async (exercise) => {
		try {
			const updatedExercise = await fetch(process.env.REACT_APP_BACKEND_URL + '/exercise/' + exercise.id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(exercise),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (updatedExercise.status !== 200) {
				throw Error('updatedExercise is not running')
			}

			const updatedExerciseResponse = await updatedExercise.json()

			const editedExerciseArray = this.state.exercises.map((exercise) => {
				if (exercise._id === updatedExerciseResponse.data._id) {
					exercise = updatedExerciseResponse.data
				}

				return exercise
			})

			this.setState({
				exercises: editedExerciseArray
			})
		} catch (err) {
			console.log(err);
		}
	}

	// ================= DELETE PLAN ================= //

	deletePlan = async (e) => {
		e.preventDefault()

		const deletedPlan = await fetch(process.env.REACT_APP_BACKEND_URL + '/plan/' + this.state.plan._id, {
			method: 'DELETE',
			credentials: 'include'
		})

		if (deletedPlan.status !== 200) {
			throw Error('deletedPlan is not running')
		}

		this.props.history.push('/community')
	}
	
	// ================= EDIT PLAN ================= //

	editingPlan = async (plan, e) => {
		try {
			const updatedPlan = await fetch(process.env.REACT_APP_BACKEND_URL + '/plan/' + this.state.plan._id, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(plan),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (updatedPlan.status !== 200) {
				throw Error('updatedPlan is not running')
			}

			const updatedPlanRes = await updatedPlan.json()

			this.setState({
				editing: false,
				plan: updatedPlanRes.data
			})
		} catch (err) {
			console.log(err);
		}
	}

	// ============================================= //

	render() {
		console.log(this.state, '<---- state in Show Plan index');
		return (
			<div className='show-plan'>
				<Card className='show-plan-head'>
					<Card.Content>
						<Card.Header style={{fontSize: 20}}>Goal: {this.state.plan.goalType}</Card.Header>
						{this.state.plan.goalType === 'Strength' ? <Card.Description>Purpose: {this.state.plan.purpose}</Card.Description> : null}
						{this.state.plan.goalType === 'Weight loss' ? 
							<Card.Description>From {this.state.plan.current} lbs to {this.state.plan.goal} lbs</Card.Description>
						: null}
					</Card.Content>
					{this.state.plan.goalType === 'Weight loss' ?
						<Progress id='progress-bar' percent={this.state.plan.progressPercent} progress />
					: null}
					
					{this.state.plan.user === this.props.userId && this.state.plan.goalType === 'Weight loss' ? <Button basic onClick={this.showProgressModal}>Progress</Button> : null}
					{this.state.progressModal ? 
						<EditProgressWeight 
							progressWeight={this.state.progressWeight} 
							handleProgressWeight={this.handleProgressWeight}
							hideProgressModal={this.hideProgressModal}
						/>
					: null}
					{this.state.plan.user === this.props.userId ? <Button basic onClick={this.editingToggle}>Edit</Button> : null}
					{this.state.editing ? 
						<EditPlan 
							editingPlan={this.editingPlan}
							plan={this.state.plan}
						/> 
					: null}
					{this.state.plan.user === this.props.userId ? <Button basic onClick={this.deletePlan}>Delete</Button> : null}
				</Card>
				
				<ExerciseList 
					planUserId={this.state.plan.user} 
					userId={this.props.userId} 
					exercises={this.state.exercises}
					deleteExercise={this.deleteExercise}
					updateExercise={this.updateExercise}
				/>

				{this.state.plan.user === this.props.userId ? 
					<div className='create-exercise'>
						<div className='add-exercise-button' onClick={this.creatingToggle}>+ add exercise</div>
						{this.state.creatingX ? <CreateExercise addExercise={this.addExercise} hideCreateExercise={this.hideCreateExercise}/> : null}
					</div>
				: null}

				{
					Object.keys(this.state.plan).length === 0 ? null :
					<Comments 
						plan={this.state.plan}
						comments={this.state.comments}
						userId={this.props.userId}
					/>
				}
			</div>
		)
	}
}



export default ShowPlan