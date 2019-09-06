import React from 'react'
import Popup from 'reactjs-popup'

class EditPopUp extends React.Component {
	constructor() {
		super()

		this.state = {
			id: '',
			type: '',
			activity: '',
			description: ''
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

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.updateExercise(this.state)
	}
	
	render() {
		// console.log(this.state, '<--- state in edit pop up');
		return (
			<Popup modal trigger={open => (<button>Edit</button>)}>
				{close => (
					<form onSubmit={this.handleSubmit}>
						<select name="type" onChange={this.handleChange}>
							<option defaultValue={this.props.exercise.type}>{this.props.exercise.type}</option>
							<option value={this.props.exercise.type === 'Strength & Conditioning' ? 'Cardio' : 'Strength & Conditioning'}
							>{this.props.exercise.type === 'Strength & Conditioning' ? 'Cardio' : 'Strength & Conditioning'}</option>
						</select>
						<input 
							type="text" 
							name="activity" 
							placeholder={this.props.exercise.activity}
							value={this.state.activity}
							onChange={this.handleChange}
						/><br/>
						<textarea 
							name="description" 
							placeholder={this.props.exercise.description} 
							value={this.state.description}
							onChange={this.handleChange}
						/><br/>
						<button>Update</button>
					</form>
				)}
			</Popup>
		)
	}
}


export default EditPopUp