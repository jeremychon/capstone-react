import React from 'react'
import Popup from 'reactjs-popup'

class EditPopUp extends React.Component {
	constructor() {
		super()

		this.state = {
			id: '',
			type: '',
			activity: '',
			description: '',
			open: false
		}
	}

	componentDidMount() {
		this.setState({
			id: this.props.exercise._id,
			type: this.props.exercise.type,
			activity: this.props.exercise.activity,
			description: this.props.exercise.description
		})
	}

	openModal = () => {
		this.setState({open: true})
	}

	closeModal = () => {
		this.setState({open: false})
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.updateExercise(this.state)

		this.setState({open: false})
	}
	
	render() {
		// console.log(this.state, '<--- state in edit pop up');
		return (
			<div>
				<button onClick={this.openModal} >Edit</button>
				<Popup 
					open={this.state.open}
					closeOnDocumentClick
					onClose={this.closeModal}
				>
					<form onSubmit={this.handleSubmit}>
						<select name="type" onChange={this.handleChange}>
							<option defaultValue={this.props.exercise.type}>{this.props.exercise.type}</option>
							<option value={this.props.exercise.type === 'Strength & Conditioning' ? 'Cardio' : 'Strength & Conditioning'}
							>{this.props.exercise.type === 'Strength & Conditioning' ? 'Cardio' : 'Strength & Conditioning'}</option>
						</select>
						Exercise: <input 
							list="activity" 
							name="activity"
							autoComplete="off" 
							value={this.state.activity}
							onChange={this.handleChange}
						/>
						{this.state.type === 'Strength & Conditioning' ? 
							<datalist id="activity">
								<option value="Squat" />
								<option value="Deadlift" />
								<option value="Bench" />
							</datalist>
						: null}
						{this.state.type === 'Cardio' ? 
							<div>
								<datalist id="activity">
									<option value="Run" />
									<option value="Bike" />
									<option value="Swim" />
								</datalist>
								<div>
									Notes: 
									<textarea 
										name="description" 
										value={this.state.description}  
										onChange={this.handleChange}
									/>
								</div>
							</div>
						: null}<br />
						<button>Update</button>
						<div style={{borderRadius: 50, border: '1px solid black', width: 20}} onClick={this.closeModal}>&times;</div>
					</form>
				</Popup>
			</div>
		)
	}
}


export default EditPopUp