import React 	  from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import SignIn 	  from './SignIn'
import Community  from './Community'
import CreatePlan from './CreatePlan'
import ShowPlan   from './ShowPlan'
import Profile 	  from './Profile'
import Header 	  from './Header'
import './App.css';

class App extends React.Component {
	constructor() {
		super()

		this.state = {
			firstName: 'Jeremy',
			lastName: 'Chon',
			userId: '5d7661c99c75bda19d721216',
			loggedIn: true
		}
	}

	userLog = (fName, lName, id) => {
		console.log(fName, lName, '<---- first and last');
		this.setState({
			firstName: fName,
			lastName: lName,
			userId: id,
			loggedIn: true,
			profileSwitch: true
		})
	}

	logout = async (e) => {
		e.preventDefault()

		try {
			const loggedOutUser = await fetch('http://localhost:9000/user/logout', {
				method: 'POST',
				credentials: 'include'
			})

			if (loggedOutUser.status !== 200) {
				throw Error('loggedOutUser is not running')
			}

			this.setState({loggedIn: false})
		} catch (err) {
			console.log(err);
		}
	}

	showUserPlans = (planShow) => {
		this.setState({profileSwitch: planShow})
	}

	render() {
		console.log(this.state, '<---- this.state in App');
		return (
			<main className="App">
				<Switch>
					<Route 
						exact path='/' 
						render={(props) => 
							<SignIn {...props} 
								userLog={this.userLog}/>}
					/>
					<Route>
						{this.state.loggedIn ? <Header logout={this.logout} userId={this.state.userId} showUserPlans={this.showUserPlans}/> : null}
						<Route 
							exact path='/community' 
							render={(props) => this.state.loggedIn ? <Community {...props} /> : <Redirect to='/' />}
						/>
						<Route
							exact path='/plan-new' 
							render={(props) => this.state.loggedIn ? <CreatePlan {...props} updateLifts={this.updateLifts}/> : <Redirect to='/' />}
						/>
						<Route 
							exact path='/plan/:id' 
							render={(props) => this.state.loggedIn ? 
								<ShowPlan {...props} 
									userId={this.state.userId}
								/> : <Redirect to='/' />}
						/>
						<Route 
							exact path='/user/:id' 
							render={(props) => this.state.loggedIn ? <Profile {...props} firstName={this.state.firstName} lastName={this.state.lastName} profileSwitch={this.state.profileSwitch}/> : <Redirect to='/' />}
						/>
					</Route>
				</Switch>
			</main>
		);

	}
}

export default withRouter(App);
