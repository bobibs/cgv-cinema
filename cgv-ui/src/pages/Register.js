import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

class Register extends Component {
	state = {
		loading: true,
		addSuccess: false,
		usernameFix: '',
		dataUser: []
	};

	componentDidMount() {
		Axios.get(`${API_URL}users`)
			.then(res => {
				this.setState({ dataUser: res.data, loading: false });
			})
			.catch(err => console.log(err));
	}

	registerButton = e => {
		e.preventDefault();
		// Get value
		const username = this.refs.username.value;
		const password = this.refs.password.value;
		const repassword = this.refs.repassword.value;

		const data = {
			username,
			password,
			role: ''
		};

		if (username === '' || password === '' || repassword === '') {
			Swal.fire({
				icon: 'error',
				text: 'Data cannot be empty'
			});
		} else {
			Axios.get(`${API_URL}users?username=${username}`)
				.then(res1 => {
					if (res1.data.length === 1) {
						Swal.fire({
							icon: 'error',
							text: 'Username exist'
						});
					} else {
						if (res1.data.length === 0) {
							if (password !== repassword) {
								Swal.fire({
									icon: 'error',
									text: "Password didn't match"
								});
							} else {
								Axios.post(`${API_URL}users`, data)
									.then(res2 => {
										Swal.fire({
											icon: 'success',
											text: 'Registration Success'
										});
										this.setState({ addSuccess: true });
									})
									.catch(err2 => console.log(err2));
							}
						}
					}
				})
				.catch(err1 => console.log(err1));
		}
	};

	render() {
		const { addSuccess, loading } = this.state;
		const { loginStatus } = this.props.reducer;

		if (loading) {
			return (
				<div>
					<Loader
						type='ThreeDots'
						color='#c5002f'
						height={100}
						width={100}
						style={{ marginTop: '250px', marginLeft: '580px' }}
					/>
				</div>
			);
		}

		if (addSuccess || loginStatus) {
			return <Redirect to='/login' />;
		}

		return (
			<div>
				<div className='container'>
					<form className='cgv-form'>
						<h2 className='cgv-h4 text-center'>Register</h2>
						<div className='form-group'>
							<label htmlFor='username'>Username</label>
							<input type='text' ref='username' className='form-control' />
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Password</label>
							<input type='password' ref='password' className='form-control' />
						</div>
						<div className='form-group'>
							<label htmlFor='re-password'>Re-Password</label>
							<input type='password' ref='repassword' className='form-control' />
						</div>
						<button className='btn cgv-btn mt-2' onClick={this.registerButton}>
							Register
						</button>
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

export default connect(mapStateToProps)(Register);
