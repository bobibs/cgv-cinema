import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { changePass } from '../redux/actions';
import { API_URL } from '../api';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';

class ManageAccount extends Component {
	state = {
		dataUser: [],
		editSuccess: false,
		loading: true
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		Axios.get(`${API_URL}users/${id}`)
			.then(res => {
				this.setState({ dataUser: [res.data], loading: false });
			})
			.catch(err => console.log(err));
	}

	renderDataUser = () => {
		const { dataUser } = this.state;

		return dataUser.map((val, index) => {
			return (
				<form key={index} style={{ margin: '150px 200px' }}>
					<h2 className='cgv-h4 text-center mb-3'>Edit Account</h2>
					<div className='form-group row'>
						<label htmlFor='namaUser' col-sm-1 col-form-label>
							Name
						</label>
						<input
							type='text'
							className='form-control'
							ref='userName'
							disabled
							value={val.username}
						/>
					</div>
					<div className='form-group row'>
						<label htmlFor='passUser' col-sm-1 col-form-label>
							New Password
						</label>
						<input type='text' className='form-control' ref='passUser' />
					</div>
					<div className='form-group row'>
						<label htmlFor='repassUser' col-sm-1 col-form-label>
							Re-New Password
						</label>
						<input type='text' className='form-control' ref='repassUser' />
					</div>
					<div className='form-group'>
						<button type='button' className='btn cgv-btn' onClick={this.editPassword}>
							Edit Password
						</button>
					</div>
				</form>
			);
		});
	};

	editPassword = () => {
		this.setState({ loading: true });

		const { id, role } = this.props.match.params;

		const username = this.refs.userName.value;
		const password = this.refs.passUser.value;
		const repassword = this.refs.repassUser.value;

		const data = {
			username,
			password,
			role
		};

		if (password === '' || repassword === '') {
			Swal.fire({
				icon: 'error',
				text: 'Data cannot be empty'
			});
		} else {
			Axios.get(`${API_URL}users?username=${username}`)
				.then(res1 => {
					if (password !== repassword) {
						Swal.fire({
							icon: 'error',
							text: "Password didn't match"
						});
					} else {
						Axios.put(`${API_URL}users/${id}`, data)
							.then(res2 => {
								Swal.fire({
									icon: 'success',
									text: 'Registration Success'
								});
								this.setState({ editSuccess: true, loading: false });
								this.changePass(data);
							})
							.catch(err2 => console.log(err2));
					}
				})
				.catch(err1 => console.log(err1));
		}
	};

	render() {
		const { loading, editSuccess } = this.state;
		const { id, loginStatus, role } = this.props.reducer;

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

		if (editSuccess) {
			return <Redirect to='/' />;
		}

		if (id && loginStatus && role === '') {
			return (
				<div>
					<div className='container'>
						<div>{this.renderDataUser()}</div>
					</div>
				</div>
			);
		}
		return <Redirect to='/' />;
	}
}

const mapStateToProps = state => {
	return {
		reducer: state.LogReducer
	};
};

export default connect(mapStateToProps, { changePass })(ManageAccount);
