import React from 'react'
import SetsList from './SetsList'
import CreateSets from './CreateSets'

class Sets extends React.Component {
	constructor() {
		super()

		this.state = {
			sets: [],
			creating: false
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

			const allSetsRes = await allSets.json()
			console.log(allSetsRes, '<---- allSetsRes');

			const filterSets = allSetsRes.data.filter(sets => sets.exerciseId === this.props.exerciseId)
			console.log(filterSets, '<----- filterSets');

			this.setState({
				sets: filterSets
			})
		} catch (err) {
			console.log(err);
		}
	}

	createSet = async (set) => {
		try {
			const createdSet = await fetch('http://localhost:9000/set/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(set),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const createdSetRes = await createdSet.json()
			console.log(createdSetRes, '<---- createSetRes');

			this.setState({
				sets: [...this.state.sets, createdSetRes.data],
				creating: false
			})

		} catch (err) {
			console.log(err);
		}
	}

	creatingModal = () => {
		this.setState({
			creating: true
		})
	}


	render() {
		console.log(this.state , '<---- state in sets');
		return (
			<div>
				<h3>Sets</h3>
				<SetsList sets={this.state.sets}/>
				{this.state.creating ? 
					<CreateSets exerciseId={this.props.exerciseId} createSet={this.createSet}/> : null}
				{this.props.userId === this.props.planUserId ? 
					<button onClick={this.creatingModal}>Add Set</button>
					: null}
			</div>
		)
	}
}



export default Sets