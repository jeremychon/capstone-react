import React from 'react';
import SignIn from './SignIn'
import MainComponent from './MainComponent'
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
			<div className="App">
				{this.state.loggedIn ? null : <SignIn userLog={this.userLog}/>}
				{this.state.loggedIn ? <MainComponent /> : null}
			</div>
		);

	}
}

export default App;
