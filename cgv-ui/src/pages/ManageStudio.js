import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import Loader from 'react-loader-spinner';
import { Link, Redirect } from 'react-router-dom';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class ManageStudio extends Component {
	state = {
		dataStudio: [],
		loading: true
	};

	componentDidMount() {
		Axios.get(`${API_URL}studios`)
			.then(res => {
				this.setState({ dataStudio: res.data, loading: false });
			})
			.catch(err => console.log(err));
	}

	renderStudio = () => {
		const { dataStudio } = this.state;
		return dataStudio.map((val, index) => {
			return (
				<tr>
					<td>{val.nama}</td>
					<td>{val.jumlahKursi}</td>
					<td>
						<div className='d-flex' style={{ justifyContent: 'center' }}>
							<div className='mr-2'>
								<Link to={`/manage-studio/edit-studio/${val.id}`}>
									<button type='button' className='btn btn-sm cgv-btn'>
										Edit
									</button>
								</Link>
							</div>
							<div>
								<button
									type='button'
									className='btn btn-sm cgv-btn'
									onClick={() => this.deleteData(val.id)}>
									Delete
								</button>
							</div>
						</div>
					</td>
				</tr>
			);
		});
	};

	deleteData = id => {
		this.setState({ loading: true });
		Axios.delete(`${API_URL}studios/${id}`)
			.then(() => {
				Axios.get(`${API_URL}studios`)
					.then(res => {
						this.setState({ dataStudio: res.data, loading: false });
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	};

	render() {
		const { loading } = this.state;
		const { role, loginStatus } = this.props.reducer;

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

		if (role === '' || !loginStatus) {
			return <Redirect to='/*' />;
		}

		return (
			<div>
				<div className='container'>
					<div className='mt-5'>
						<Link to='/manage-studio/add-studio'>
							<button type='button' className='btn btn-sm cgv-btn'>
								Add Studio
							</button>
						</Link>
					</div>
					<div className='mt-3 text-center'>
						<Table hover size='sm'>
							<thead>
								<tr>
									<th>Name</th>
									<th>Capaity</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>{this.renderStudio()}</tbody>
						</Table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		reducer: state.LogReducer
	};
};

export default connect(mapStateToProps)(ManageStudio);
