import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import SignIn from './SignIn'
import Community from './Community'
import CreatePlan from './CreatePlan'
import ShowPlan from './ShowPlan'
import Profile from './Profile'
import Header from './Header'
import './App.css';

class App extends React.Component {
	constructor() {
		super()

		this.state = {
			firstName: '',
			lastName: '',
			userId: '',
			loggedIn: false
		}
	}

	userLog = (fName, lName, id) => {
		console.log(fName, lName, '<---- first and last');
		this.setState({
			firstName: fName,
			lastName: lName,
			userId: id,
			loggedIn: true
		})
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
						{this.state.loggedIn ? <Header userId={this.state.userId}/> : null}
						<Route 
							exact path='/community' 
							render={(props) => this.state.loggedIn ? <Community {...props} /> : <Redirect to='/' />}
						/>
						<Route
							exact path='/plan-new' 
							render={(props) => this.state.loggedIn ? <CreatePlan {...props} /> : <Redirect to='/' />}
						/>
						<Route 
							exact path='/plan/:id' 
							render={(props) => this.state.loggedIn ? <ShowPlan {...props} userId={this.state.userId}/> : <Redirect to='/' />}
						/>
						<Route 
							exact path='/user/:id' 
							render={(props) => this.state.loggedIn ? <Profile {...props} /> : <Redirect to='/' />}
						/>
					</Route>
				</Switch>
			</main>
		);

	}
}

export default withRouter(App);
