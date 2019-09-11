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
			firstName: '',
			lastName: '',
			userId: '',
			profPic: null,
			loggedIn: false,
			correctLog: true
		}
	}

	register = async (data) => {
		try {
			const registerRes = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/register', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (registerRes.status !== 200) {
				throw Error('register is not running')
			}

			const parsedRegister = await registerRes.json();


			if (parsedRegister.code === 200) {
				this.setState({
					...parsedRegister.data,
					userId: parsedRegister.data._id,
					loggedIn: true
				})

				this.props.history.push('/community')
			} else {
				this.setState({userExists: true})
			}

		} catch (err) {
			console.log(err);
		}
	}

	login = async (data) => {
		const login = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/login', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const parsedLogin = await login.json()

		if (parsedLogin.code === 200) {
			this.setState({
				...parsedLogin.data,
				userId: parsedLogin.data._id,
				loggedIn: true
			})
			this.props.history.push('/community')
		} else {
			this.setState({
				loggedIn: false,
				correctLog: false
			})

		}
	}

	logout = async (e) => {
		e.preventDefault()

		try {

			const loggedOutUser = await fetch(process.env.REACT_APP_BACKEND_URL + '/user/logout', {
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
		// console.log(this.state, '<---- this.state in App');
		return (
			<main className="App">
				<Switch>
					<Route 
						exact path='/' 
						render={(props) => 
							<SignIn {...props} 
								register={this.register}
								login={this.login}
								correctLog={this.state.correctLog}
							/>
						}
					/>
					<Route>
						{this.state.loggedIn ? 
							<Header 
								logout={this.logout} 
								userId={this.state.userId} 
								showUserPlans={this.showUserPlans}
							/> 
						: null}
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
							render={(props) => this.state.loggedIn ? 
								<Profile {...props} 
									userInfo={this.state}
									profileSwitch={this.state.profileSwitch}
								/> 
								: <Redirect to='/' />}
						/>
					</Route>
				</Switch>
			</main>
		);

	}
}

export default withRouter(App);
