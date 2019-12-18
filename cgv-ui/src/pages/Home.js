import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import Carousel from '../components/Carousel';

class Home extends Component {
	state = {
		dataFilm: [],
		loading: true
	};

	componentDidMount() {
		Axios.get(`${API_URL}movies`)
			.then(res => {
				// console.log('res', res.data);
				this.setState({ dataFilm: res.data, loading: false });
			})
			.catch(err => console.log(err));
	}

	renderNowPlaying = () => {
		const { dataFilm } = this.state;
		return dataFilm.map((val, index) => {
			if (val.status === 'Playing Now') {
				return (
					<div className='col-md-3'>
						<div className='card' style={{ border: 'none' }} key={index}>
							<img style={{ height: '350px' }} src={val.image} alt={val.title} />
							<div className='card-body'>
								<p className='card-title text-center'>{val.title}</p>
								<div className='mx-3'>
									<Link
										to={{
											pathname: `/book-now/${val.id}`,
											state: this.state.dataFilm[val.id - 1]
										}}>
										<button className='btn btn-sm cgv-btn mr-1'>Book Now</button>
									</Link>
									<Link to={`/view-details/${val.id}`}>
										<button className='btn btn-sm cgv-btn'>View Details</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				);
			}
		});
	};

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
				<Carousel />
				<div className='container mt-5'>
					<div className='d-flex mb-3'>
						<h4 className='mr-3 cgv-h4'>Now Playing</h4>
						<Link to='/now-playing'>
							<button type='button' className='btn btn-sm cgv-btn'>
								See More
							</button>
						</Link>
					</div>
					<div className='row'>{this.renderNowPlaying()}</div>
				</div>
				<div className='container mt-5'>
					<div className='d-flex mb-3'>
						<h4 className='mr-3 cgv-h4'>Coming Soon</h4>
						<Link to='/upcoming-film'>
							<button type='button' className='btn btn-sm cgv-btn'>
								See More
							</button>
						</Link>
					</div>
					<div className='row'>{this.renderComingSoon()}</div>
				</div>
			</div>
		);
	}
}

export default Home;
