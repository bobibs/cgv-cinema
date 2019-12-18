import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class EditStudio extends Component {
	state = {
		dataStudio: [],
		editSuccess: false,
		loading: true
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		Axios.get(`${API_URL}studios/${id}`)
			.then(res => {
				this.setState({ dataStudio: [res.data], loading: false });
			})
			.catch(err => console.log(err));
	}

	renderEditStudio = () => {
		const { dataStudio } = this.state;

		return dataStudio.map((val, index) => {
			return (
				<form key={index} style={{ margin: '150px 200px' }}>
					<h2 className='cgv-h4 text-center mb-3'>Edit Studio</h2>
					<div className='form-group row'>
						<label htmlFor='studioname' col-sm-1 col-form-label>
							Studio Name
						</label>
						<input
							type='text'
							className='form-control'
							ref='studioname'
							defaultValue={val.nama}
						/>
					</div>
					<div className='form-group row'>
						<label htmlFor='seatcapacity' col-sm-1 col-form-label>
							Seat Capacity
						</label>
						<input
							type='text'
							className='form-control'
							ref='seatcapacity'
							defaultValue={val.jumlahKursi}
						/>
					</div>
					<div className='form-group'>
						<button type='button' className='btn cgv-btn' onClick={this.editStudio}>
							Edit Studio
						</button>
					</div>
				</form>
			);
		});
	};

	editStudio = () => {
		this.setState({ loading: true });
		const { id } = this.props.match.params;
		const nama = this.refs.studioname.value;
		const jumlahKursi = this.refs.seatcapacity.value;

		const data = {
			nama,
			jumlahKursi
		};

		Axios.put(`${API_URL}studios/${id}`, data)
			.then(res => {
				this.setState({ editSuccess: true, loading: false });
			})
			.catch(err => console.log(err));
	};

	render() {
		const { loading, editSuccess } = this.state;

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
			return <Redirect to='/manage-studio' />;
		}

		return (
			<div>
				<div className='container'>
					<div>{this.renderEditStudio()}</div>
				</div>
			</div>
		);
	}
}

export default EditStudio;
