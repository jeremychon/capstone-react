import React from 'react'
import CreateExercise from '../CreateExercise'
import ExerciseList from './ExerciseList'
import EditProgressWeight from './EditProgressWeight'
import Comment from '../Comment'
import { Card, Button, Progress } from 'semantic-ui-react'

class ShowPlan extends React.Component {
	constructor() {
		super()

		this.state = {
			editing: false,
			creatingX: false,
			exercises: [],
			plan: {},
			// USED FOR EDITING PLAN
			goalType: '',
			purpose: '',
			current: '',
			goal:'',
			public: false,
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

		this.setState({progressModal: true})
	}

	hideProgressModal = (e) => {
		e.preventDefault()

		this.setState({progressModal: false})
	}

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
					progressPercent: progressPercent
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (updatedPlan.status !== 200) {
				throw Error('updatedPlan is not running')
			}

			const updatedPlanRes = await updatedPlan.json()
			console.log(updatedPlanRes, '<---- updatedPlanRes');

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

		const foundPlan = await fetch('http://localhost:9000/plan/' + id, {
			method: 'GET',
			credentials: 'include'
		})
		console.log(foundPlan, '<---- foundPlan');

		if (foundPlan.status !== 200) {
			throw Error('foundPlan is not running');
		}

		const foundPlanResponse = await foundPlan.json()
		console.log(foundPlanResponse, '<--- foundPlanResponse');

		this.setState({
			plan: foundPlanResponse.plan,
			goalType: foundPlanResponse.plan.goalType,
			current: foundPlanResponse.plan.current,
			goal: foundPlanResponse.plan.goal,
			purpose: foundPlanResponse.plan.purpose
		})
	}

	// ================= GET ALL EXERCISES ================= //

	getExercises = async () => {
		const { id } = this.props.match.params

		const allExercises = await fetch('http://localhost:9000/exercise/', {
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

		this.setState({editing: true})
	}

	creatingToggle = (e) => {
		e.preventDefault()

		this.setState({creatingX: true})
	}

	// ================= CREATE EXERCISE ================= //

	addExercise = async (exercise, e) => {
		e.preventDefault()

		try {
			exercise.planId = this.state.plan._id

			const addedExercise = await fetch('http://localhost:9000/exercise/', {
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
			console.log(addedExerciseResponse, '<---- addedExerciseResponse');

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
			const deletedExercise = await fetch('http://localhost:9000/exercise/' + exerciseId, {
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
			const updatedExercise = await fetch('http://localhost:9000/exercise/' + exercise.id, {
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

		const deletedPlan = await fetch('http://localhost:9000/plan/' + this.state.plan._id, {
			method: 'DELETE',
			credentials: 'include'
		})

		if (deletedPlan.status !== 200) {
			throw Error('deletedPlan is not running')
		}

		this.props.history.push('/community')
	}
	
	// ================= EDIT PLAN ================= //

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleInputChange = (e) => {
		this.setState({
			public: e.currentTarget.checked ? true : false
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()

		const updatedPlan = await fetch('http://localhost:9000/plan/' + this.state.plan._id, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify({
				goalType: this.state.goalType,
				current: parseInt(this.state.current),
				goal: parseInt(this.state.goal),
				public: this.state.public
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (updatedPlan.status !== 200) {
			throw Error('updatedPlan is not running')
		}

		const updatedPlanResponse = await updatedPlan.json()

		this.setState({
			editing: false,
			plan: updatedPlanResponse.data
		})
	}

	// ============================================= //

	render() {
		console.log(this.state, '<---- this.state in ShowPlan');
		return (
			<div className='show-plan'>
				{this.state.editing ? null : 
					<Card className='show-plan-head'>
						<Card.Content>
							<Card.Header style={{fontSize: 20}}>Goal: {this.state.plan.goalType}</Card.Header>
							{this.state.plan.goalType === 'Strength' ? <Card.Description>Purpose: {this.state.plan.purpose}</Card.Description> : null}
							{this.state.plan.goalType === 'Weight loss' ? 
								<Card.Description>From {this.state.plan.current} lbs to {this.state.plan.goal} lbs</Card.Description>
							: null}
						</Card.Content>
						{this.state.plan.goalType === 'Weight loss' ?
							<Progress percent={this.state.plan.progressPercent} progress />
						: null}
						
						{this.state.plan.user === this.props.userId ? <Button basic onClick={this.showProgressModal}>Progress</Button> : null}
						{this.state.progressModal ? 
							<EditProgressWeight 
								progressWeight={this.state.progressWeight} 
								handleProgressWeight={this.handleProgressWeight}
								hideProgressModal={this.hideProgressModal}
							/>
						: null}
						{this.state.plan.user === this.props.userId ? <Button basic onClick={this.editingToggle}>Edit</Button> : null}
						{this.state.plan.user === this.props.userId ? <Button basic onClick={this.deletePlan}>Delete</Button> : null}
					</Card>
				}


				{this.state.editing ? 
					<form onSubmit={this.handleSubmit}>
						<select name="goalType" onChange={this.handleChange}>
							<option defaultValue={this.state.plan.goalType}>{this.state.plan.goalType}</option>
							<option value={this.state.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss'}>{this.state.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss'}</option>
						</select>
						{this.state.goalType === 'Weight loss' ? 
							<div>
								Current: <input 
									type="number" 
									name="current" 
									value={this.state.current}
									onChange={this.handleChange}
								/> lbs <br />
								Goal: <input 
									type="number" 
									name="goal"  
									value={this.state.goal}
									onChange={this.handleChange}
								/> lbs <br />
							</div>
						: null}
						{this.state.goalType === 'Strength' ? 
							<div>
								Purpose: 
								<textarea 
									name="purpose" 
									value={this.state.purpose} 
									onChange={this.handleChange}
								/>
							</div> 
						: null}
						Share?
						<input 
							type="checkbox"
							name="public"
							checked={this.state.public}
							onChange={this.handleInputChange}
						/>
						<button>Update</button>
					</form> 
					: null
				}
				
				<ExerciseList 
					planUserId={this.state.plan.user} 
					userId={this.props.userId} 
					exercises={this.state.exercises}
					deleteExercise={this.deleteExercise}
					updateExercise={this.updateExercise}
				/>

				{this.state.plan.user === this.props.userId ? 
					<div className='createExercise'>
						<div className='addExerciseButton' onClick={this.creatingToggle}>+ Add Exercise</div>
						{this.state.creatingX ? <CreateExercise addExercise={this.addExercise}/> : null}
					</div>
				: null}
				<Comment />
			</div>
		)
	}
}



export default ShowPlan