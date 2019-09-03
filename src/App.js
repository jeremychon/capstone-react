import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SignIn from './SignIn'
import Community from './Community'
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
					<Route exact path='/' component={(props) => <SignIn {...props} userLog={this.userLog}/>} />
					<Route exact path='/community' component={(props) => <Community {...props} />}/>
				</Switch>
			</main>
		);

	}
}

export default App;
