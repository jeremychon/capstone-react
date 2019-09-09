import React from 'react'
import { withRouter } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'

class Header extends React.Component {
	constructor() {
		super()

		this.state = {
			activeNavItem: 'Community'
		}
	}

	toCreate = (e) => {
		e.preventDefault()

		this.setState({activeNavItem: 'Create'})
		
		const { history } = this.props
		if ( history ) history.push('/plan-new')
	}

	toCommunity = (e) => {
		e.preventDefault()

		this.setState({activeNavItem: 'Community'})

		const { history } = this.props
		if ( history ) history.push('/community')
	}

	toProfilePlans = (e) => {
		e.preventDefault()

		this.setState({activeNavItem: 'Profile'})

		this.props.showUserPlans(true)

		const { history } = this.props
		if ( history ) history.push('/user/' + this.props.userId)
	}

	toProfileProgress = (e) => {
		e.preventDefault()

		this.setState({activeNavItem: 'Profile'})

		this.props.showUserPlans(false)

		const { history } = this.props
		if ( history ) history.push('/user/' + this.props.userId)
	}

	render() {

		const { activeNavItem } = this.state

		return (
			<div className='headerBackground'>
				<div className='headerTitle'>
					<div className='headerWeightTitle'>weight</div>
					<div className='headerMateTitle'>MATE</div>
				</div>
				<Menu className='nav-bar' secondary inverted >
					<Menu.Item
						className='nav-bar-item'
						name='Create'
						active={activeNavItem === 'Create'}
						onClick={this.toCreate}
					/>
					<Menu.Item
						className='nav-bar-item'
						name='Community'
						active={activeNavItem === 'Community'}
						onClick={this.toCommunity}
					/>
					<Dropdown 
						className='nav-bar-item' 
						item
						text='Profile'
					>
						<Dropdown.Menu>
							<Dropdown.Item 
								text='Plans'
								onClick={this.toProfilePlans}
							/>
							<Dropdown.Item 
								text='Progress'
								onClick={this.toProfileProgress} 
							/>
							<Dropdown.Item 
								text='Logout'
								onClick={this.props.logout} 
							/>
						</Dropdown.Menu>
					</Dropdown>
				</Menu>
			</div>
		)
	}
}



export default withRouter(Header);