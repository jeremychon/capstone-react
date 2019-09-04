import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import SignIn from './SignIn'
import Community from './Community'
import CreatePlan from './CreatePlan'
import Header from './Header'
import './App.css';

class App extends React.Component {
	constructor() {
		super()

		this.state = {
			firstName: '',
			lastName: '',
			loggedIn: false
		}
	}

	userLog = (fName, lName) => {
		console.log(fName, lName, '<---- first and last');
		this.setState({
			firstName: fName,
			lastName: lName,
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
						component={(props) => 
							<SignIn {...props} 
								userLog={this.userLog}/>}
					/>
					<Route>
						{this.state.loggedIn ? <Header /> : null}
						<Route 
							exact path='/community' 
							component={(props) => this.state.loggedIn ? <Community {...props} /> : <Redirect to='/' />}
						/>
						<Route 
							exact path='/plan/new' 
							component={(props) => this.state.loggedIn ? <CreatePlan {...props} /> : <Redirect to='/' />}
						/>
					</Route>
				</Switch>
			</main>
		);

	}
}

export default withRouter(App);
