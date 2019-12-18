import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class UpcomingFilm extends Component {
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

	renderComingSoon = () => {
		const { dataFilm } = this.state;
		return dataFilm.map((val, index) => {
			if (val.status === 'Coming Soon') {
				return (
					<div className='col-md-3'>
						<div className='card' style={{ border: 'none' }} key={index}>
							<img style={{ height: '350px' }} src={val.image} alt={val.title} />
							<div className='card-body'>
								<p className='card-title text-center'>{val.title}</p>
								<div>
									<Link to={`/view-details/${val.id}`}>
										<button className='btn btn-sm cgv-btn' style={{ marginLeft: '60px' }}>
											View Details
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				);
			}
		});
	};

	render() {
		const { loading } = this.state;

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
				<div className='container mt-3'>
					<div className='d-flex mb-3'>
						<Link to='/'>
							<button type='button' className='btn btn-sm cgv-btn'>
								Home
							</button>
						</Link>
					</div>
					<div className='row'>{this.renderComingSoon()}</div>
				</div>
			</div>
		);
	}
}

export default UpcomingFilm;
