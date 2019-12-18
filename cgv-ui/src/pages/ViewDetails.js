import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import { Link, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class ViewDetails extends Component {
	state = {
		dataFilm: [],
		bookNow: false,
		loading: true
	};

	componentDidMount() {
		const id = this.props.match.params.id;
		Axios.get(`${API_URL}movies/${id}`)
			.then(res => {
				this.setState({ dataFilm: [res.data], loading: false });
			})
			.catch(err => console.log(err));
	}

	renderDetailsFilm = () => {
		const { dataFilm } = this.state;
		return dataFilm.map((val, index) => {
			return (
				<div>
					<div className='d-flex'>
						<div>
							<img alt={val.title} src={val.image} />
						</div>
						<div className='ml-5'>
							<div>
								<h5 className='cgv-h5'>Title</h5>
								<p className='cgv-p'>{val.title}</p>
							</div>
							<div>
								<h5 className='cgv-h5'>Duration</h5>
								<p className='cgv-p'>{val.duration} min</p>
							</div>
							<div>
								<h5 className='cgv-h5'>Cast</h5>
								<p className='cgv-p'>{[...val.cast.join(', ')]}</p>
							</div>
							<div>
								<h5 className='cgv-h5'>Director</h5>
								<p className='cgv-p'>{val.director}</p>
							</div>
							<div>
								<h5 className='cgv-h5'>Country</h5>
								<p className='cgv-p'>{val.country}</p>
							</div>
							<div>
								<h5 className='cgv-h5'>Studio</h5>
								<p className='cgv-p'>{val.studio}</p>
							</div>
							<div>
								<h5 className='cgv-h5'>Jadwal</h5>
								<p className='cgv-p'>{[...val.jadwal.join(', ')]}</p>
							</div>
						</div>
					</div>
					<div className='mt-3'>
						<h5 className='cgv-h5'>Synopsis</h5>
						<p className='cgv-p'>{val.synopsis}</p>
					</div>
					<div className='mt-3'>
						<h5 className='cgv-h5'>Trailers</h5>
						<div className='d-flex'>
							<iframe
								title='Trailers 1'
								className='trailers mr-3'
								width='560'
								height='315'
								src={val.trailers[0]}
								frameBorder='0'
								allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
							/>
							<iframe
								title='Trailers 2'
								className='trailers'
								width='560'
								height='315'
								src={val.trailers[1]}
								frameBorder='0'
								allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
							/>
						</div>
					</div>
				</div>
			);
		});
	};

	renderBookNow = () => {
		const { dataFilm } = this.state;

		return dataFilm.map((val, index) => {
			if (val.status === 'Playing Now')
				return (
					<div>
						<button
							type='button'
							className='btn btn-sm cgv-btn mt-3'
							onClick={() => this.setState({ bookNow: true })}>
							Book Now
						</button>
					</div>
				);
		});
	};

	render() {
		const { loading, bookNow, dataFilm } = this.state;

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

		if (bookNow) {
			return <Redirect to={{ pathname: '/book-now', state: dataFilm }} />;
		}
		return (
			<div>
				<div className='container'>
					<div className='d-flex'>
						<Link to='/'>
							<button type='button' className='btn btn-sm cgv-btn mt-3 mr-3'>
								Home
							</button>
						</Link>
						<div>{this.renderBookNow()}</div>
					</div>
					<div className='mt-3'>{this.renderDetailsFilm()}</div>
				</div>
			</div>
		);
	}
}

export default ViewDetails;
