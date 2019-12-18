import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import Loader from 'react-loader-spinner';
import { Link, Redirect } from 'react-router-dom';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class ManageAdmin extends Component {
	state = {
		dataFilm: [],
		loading: true
	};

	componentDidMount() {
		Axios.get(`${API_URL}movies`)
			.then(res => {
				this.setState({ dataFilm: res.data, loading: false });
			})
			.catch(err => console.log(err));
	}

	renderMovies = () => {
		const { dataFilm } = this.state;
		return dataFilm.map((val, index) => {
			return (
				<tr>
					<td>
						<img
							src={val.image}
							alt={val.title}
							style={{ width: '100px', height: '150px' }}
						/>
					</td>
					<td>
						<div style={{ marginTop: '60px' }}>{val.title}</div>
					</td>
					<td>
						<div
							style={
								val.status === 'Playing Now'
									? { marginTop: '60px', fontStyle: 'italic', color: '#c5002f' }
									: { marginTop: '60px', fontStyle: 'italic', color: '#242424' }
							}>
							{val.status}
						</div>
					</td>
					<td>
						<div>
							<div style={{ marginTop: '40px', marginBottom: '20px' }}>
								<Link to={`/manage-admin/edit-data/${val.id}`}>
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
		Axios.delete(`${API_URL}movies/${id}`)
			.then(() => {
				Axios.get(`${API_URL}movies`)
					.then(res => {
						this.setState({ dataFilm: res.data, loading: false });
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	};

	render() {
		const { loading } = this.state;
		const { role } = this.props.reducer;
		if (role === '') {
			return <Redirect to='/*' />;
		}

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
		return (
			<div>
				<div className='container'>
					<div className='mt-5'>
						<Link to='/manage-admin/add-data'>
							<button type='button' className='btn btn-sm cgv-btn'>
								Add Data
							</button>
						</Link>
					</div>
					<div className='mt-3 text-center'>
						<Table hover size='sm'>
							<thead>
								<tr>
									<th>Poster</th>
									<th>Cast</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>{this.renderMovies()}</tbody>
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

export default connect(mapStateToProps)(ManageAdmin);
