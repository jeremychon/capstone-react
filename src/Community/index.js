import React from 'react'
import CommunityList from './CommunityList'
import { Menu } from 'semantic-ui-react'

class Community extends React.Component {
	constructor() {
		super()

		this.state = {
			plans: [],
			filterPlans: [],
			filter: false,
			activeItem: 'All'
		}
	}

	componentDidMount() {
		this.getAllPlans()
	}

	getAllPlans = async () => {
		const allPlans = await fetch(process.env.REACT_APP_BACKEND_URL + '/plan/', {
			method: 'GET',
			credentials: 'include'
		})

		if (allPlans.status !== 200) {
			throw Error('Plans not found')
		}

		const allPlansResponse = await allPlans.json()

		const sharedPlans = allPlansResponse.data.filter(plan => plan.public === true)

		this.setState({
			plans: sharedPlans
		})
	}

	onlyStrength = (e) => {
		e.preventDefault()


		const onlyStr = this.state.plans.filter(plan => plan.goalType === 'Strength')

		this.setState({
			filterPlans: onlyStr,
			filter: true,
			activeItem: 'Strength'
		})
	}

	onlyWeightLoss = (e) => {
		e.preventDefault()

		const onlyWL = this.state.plans.filter(plan => plan.goalType === 'Weight loss')

		this.setState({
			filterPlans: onlyWL,
			filter: true,
			activeItem: 'Weight loss'
		})
	}

	allPlans = (e) => {
		e.preventDefault()

		this.setState({
			filter: false,
			activeItem: 'All'
		})
	}

	showPlan = (id, e) => {
		e.preventDefault()

		this.props.history.push('/plan/' + id)
	}

	render() {
		const { activeItem } = this.state
		// console.log(this.state, '<--- state in Community');
		return (
			<div>
				<Menu text className='communityFilter'>
					<Menu.Item
						className='communityFilterItem'
						name='Strength'
						active={activeItem === 'Strength'}
						onClick={this.onlyStrength}
						style={{fontSize: 15}}
					/>
					<Menu.Item
						className='communityFilterItem'
						name='Weight loss'
						active={activeItem === 'Weight loss'}
						onClick={this.onlyWeightLoss}
						style={{fontSize: 15}}
					/>
					<Menu.Item
						className='communityFilterItem'
						name='All'
						active={activeItem === 'All'}
						onClick={this.allPlans}
						style={{fontSize: 15}}
					/>
				</Menu>
				<CommunityList 
					filter={this.state.filter} 
					filterPlans={this.state.filterPlans}
					plans={this.state.plans} 
					showPlan={this.showPlan}
				/>
			</div>
		)
	}
}


export default Community