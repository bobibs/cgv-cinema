import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import { loginAction } from '../redux/actions';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

class Login extends Component {
	state = {
		loading: true
	};

	loginButton = e => {
		e.preventDefault();

		const username = this.refs.username.value;
		const password = this.refs.password.value;

		const data = {
			username,
			password
		};

		Axios.get(`${API_URL}users?username=${username}&password=${password}`)
			.then(res => {
				localStorage.setItem('userId', res.data[0].id);
				this.props.loginAction(data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		const { loginStatus } = this.props.reducer;

		if (loginStatus) {
			return <Redirect path='/' />;
		}
		return (
			<div>
				<div className='container'>
					<form className='cgv-form'>
						<h2 className='cgv-h4 text-center'>Login</h2>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input
								type='text'
								name='username'
								ref='username'
								className='form-control'
							/>
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='password' ref='password' className='form-control' />
						</div>
						<button className='btn cgv-btn mt-2 mr-2' onClick={this.loginButton}>
							Login
						</button>
						<div className='d-flex mt-2'>
							<p className='mr-2'>Don't have account?</p>
							<Link to='/register' style={{ color: '#c5002f' }}>
								Sign Up
							</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	// console.log(state.LogReducer);
	return {
		reducer: state.LogReducer
	};
};

export default connect(mapStateToProps, { loginAction })(Login);
