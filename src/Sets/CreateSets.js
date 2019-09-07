import React from 'react'

class CreateSets extends React.Component {
	constructor() {
		super()

		this.state = {
			weight: '',
			reps: '',
			notes: ''
		}
	}

	// componentDidMount() {
	// 	this.setState({exerciseId: this.props.exerciseId})
	// }

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.props.addSet(this.state)
	}

	render() {
		console.log(this.state, '<---- state in create sets');
		return (
			<form onSubmit={this.handleSubmit}>
				Weight: <input 
					type="number" 
					name='weight' 
					value={this.state.weight} 
					placeholder='Weight'
					onChange={this.handleChange}
				/>
				Reps: <input 
					type="number" 
					name='reps' 
					value={this.state.reps} 
					placeholder='# of reps'
					onChange={this.handleChange}
				/>
				Notes: <textarea 
					name='notes' 
					value={this.state.notes}
					onChange={this.handleChange}
				/>
				<button>Done</button>
			</form>
		)
	}
}


export default CreateSets


