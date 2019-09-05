import React from 'react'
import CreateExercise from '../CreateExercise'
import ExerciseList from './ExerciseList'

class ShowPlan extends React.Component {
	constructor() {
		super()

		this.state = {
			editing: false,
			creatingX: false,
			exercises: [],
			plan: {},
			goalType: '',
			current: '',
			goal:'',
			public: false
		}
	}

	componentDidMount() {
		this.getPlan()
		this.getExercises()
	}

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

		this.setState({
			plan: foundPlanResponse.data,
			goalType: foundPlanResponse.data.goalType
		})
	}

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

	editingToggle = (e) => {
		e.preventDefault()

		this.setState({editing: true})
	}

	creatingToggle = (e) => {
		e.preventDefault()

		this.setState({creatingX: true})
	}

	addExercise = async (exercise) => {
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
				exercises: [...this.state.exercises, addedExerciseResponse.data]
			})

			this.props.history.push('/plan/' + this.props.match.params.id)
			
		} catch (err) {
			console.log(err);
		}
	}

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
	
	// ================= CREATING THE PLAN ================= //

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
		console.log(updatedPlanResponse, '<---- updatedPlanResponse');

		this.setState({
			editing: false,
			plan: updatedPlanResponse.data
		})
	}

	// ================= CREATING THE PLAN ================= //

	render() {
		console.log(this.state, '<---- this.state in ShowPlan');
		return (
			<div>
				<h1>Show Plan</h1>
					{this.state.editing ? null : 
						<div>
						<div>{this.state.plan.goalType}</div>
						<div>{this.state.plan.current}</div>
						<div>{this.state.plan.goal}</div>
						{this.state.plan.user === this.props.userId ? <button onClick={this.editingToggle}>Edit</button> : null}
						{this.state.plan.user === this.props.userId ? <button onClick={this.deletePlan}>Delete</button> : null}
						</div>
					}

					{this.state.editing ? 
						<form onSubmit={this.handleSubmit}>
							<select name="goalType" onChange={this.handleChange}>
								<option defaultValue={this.state.goalType}>{this.state.plan.goalType}</option>
								<option value={this.state.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss'}>{this.state.plan.goalType === 'Weight loss' ? 'Strength' : 'Weight loss'}</option>
							</select>
							<input 
								type="number" 
								name="current" 
								value={this.state.current} 
								placeholder={this.state.plan.current} 
								onChange={this.handleChange}
							/>
							<input 
								type="number" 
								name="goal" 
								value={this.state.goal} 
								placeholder={this.state.plan.goal} 
								onChange={this.handleChange}
							/>
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

					<ExerciseList exercises={this.state.exercises}/>

					{this.state.plan.user === this.props.userId ? 
						<div>
							<p onClick={this.creatingToggle}>+ Add Exercise</p>
							{this.state.creatingX ? <CreateExercise addExercise={this.addExercise}/> : null}
						</div>
					: null}
			</div>
		)
	}
}



export default ShowPlan