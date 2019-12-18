import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class AddStudio extends Component {
	state = {
		loading: true,
		addSuccess: false
	};

	componentDidMount() {
		Axios.get(`${API_URL}studios`)
			.then(res => {
				this.setState({ loading: false });
			})
			.catch(err => console.log(err));
	}

	addStudio = () => {
		this.setState({ loading: true });
		const nama = this.refs.studioname.value;
		const jumlahKursi = this.refs.seatcapacity.value;

		const data = {
			nama,
			jumlahKursi
		};

		Axios.post(`${API_URL}studios`, data)
			.then(res => {
				this.setState({ loading: false, addSuccess: true });
			})
			.catch(err => console.log(err));
	};

	render() {
		const { loading, addSuccess } = this.state;

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

		if (addSuccess) {
			return <Redirect to='/manage-studio' />;
		}

		return (
			<div>
				<div className='container'>
					<div style={{ marginTop: '170px', marginLeft: '300px' }}>
						<div className='mb-5'>
							<h5 className='cgv-h5'>Add Studio</h5>
						</div>
						<form className='form'>
							<div className='form-group row'>
								<label htmlFor='studioname' className='col-sm-2 col-form-label'>
									Studio Name
								</label>
								<div className='col-sm-7'>
									<input type='text' className='form-control' ref='studioname' />
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='seatcapacity' className='col-sm-2 col-form-label'>
									Seat Capacity
								</label>
								<div className='col-sm-7'>
									<input type='text' className='form-control' ref='seatcapacity' />
								</div>
							</div>
							<div className='form-group'>
								<button type='button' className='btn  cgv-btn' onClick={this.addStudio}>
									Create Studio
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddStudio;
