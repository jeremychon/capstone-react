import React from 'react'

class EditSet extends React.Component {
	constructor() {
		super()

		this.state = {
			weight: 0,
			reps: 0,
			notes: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}

	render() {
		return (
			<div>Edit</div>
		)
	}
}



export default EditSet