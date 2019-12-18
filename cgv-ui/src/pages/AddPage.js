import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class AddPage extends Component {
	state = {
		jadwal:[12,14,16,18,20,22],
		addSuccess: false,
		loading: false
	};

	checkBoxAddData = () => {
		const {jadwal} = this.state
		return jadwal.map((val,index) => {
			return(
				<div key={index} className='ml-3 mt-2'>
					<input type="checkbox" ref={`jadwal${index}`}/>
					<span className='mr-2 ml-1'>{val}.00</span>
				</div>
			)
		})
	}

	addData = () => {
		const jadwalTemplate = [12,14,16,18,20,22]
		const jadwal = []
		for(let i = 0; i < jadwalTemplate.length; i++){
			if(this.refs[`jadwal${i}`].checked){
				jadwal.push(jadwalTemplate[i])
			}
		}


		// Get value
		const title = this.refs.title.value;
		const duration = this.refs.duration.value;
		const getCast = this.refs.cast.value;
		const cast = getCast.split(',');
		const director = this.refs.director.value;
		const country = this.refs.country.value;
		const studio = this.refs.studio.value;
		const synopsis = this.refs.synopsis.value;
		const getTrailers = this.refs.trailers.value;
		const trailers = getTrailers.split(',');
		const status = this.refs.status.value;
		const image = this.refs.image.value;

		const data = {
			image,
			title,
			duration,
			cast,
			director,
			country,
			studio,
			jadwal,
			synopsis,
			trailers,
			status
		};

		this.setState({ loading: true });

		Axios.post(`${API_URL}movies`, data)
			.then(res => {
				this.setState({ addSuccess: true, loading: false });
			})
			.catch(err => console.log(err));
	};

	render() {
		const { addSuccess, loading } = this.state;

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
			return <Redirect to='/manage-admin' />;
		}

		return (
			<div>
				<div className='container'>
					<div className='text-center mt-3'>
						<h5 className='cgv-h5'>ADD DATA</h5>
					</div>
					<div style={{ marginTop: '20px', marginLeft: '250px' }}>
						<form className='form'>
							<div className='form-group row'>
								<label htmlFor='title' className='col-sm-1 col-form-label'>
									Title
								</label>
								<div className='col-sm-7'>
									<input type='text' ref='title' className='form-control' />
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='duration' className='col-sm-1 col-form-label'>
									Duration
								</label>
								<div className='col-sm-7'>
									<input type='text' ref='duration' className='form-control' />
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='cast' className='col-sm-1 col-form-label'>
									Cast
								</label>
								<div className='col-sm-7'>
									<input type='text' ref='cast' className='form-control' />
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='director' className='col-sm-1 col-form-label'>
									Director
								</label>
								<div className='col-sm-7'>
									<input type='text' ref='director' className='form-control' />
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='country' className='col-sm-1 col-form-label'>
									Country
								</label>
								<div className='col-sm-7'>
									<select ref='country' className='form-control' defaultValue=''>
										<option selected hidden>
											Choose One
										</option>
										<option value='USA'>USA</option>
										<option value='Indonesia'>Indonesia</option>
									</select>
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='studio' className='col-sm-1 col-form-label'>
									Studio
								</label>
								<div className='col-sm-7'>
									<input type='text' ref='studio' className='form-control' />
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor='jadwal' className='col-sm-1 col-form-label'>
									Jadwal
								</label>
									{this.checkBoxAddData()}
							</div>
							<div className='form-group row'>
								<label htmlFor='synopsis' className='col-sm-1 col-form-label'>
									Synopsis
								</label>
								<div className='col-sm-7'>
									<textarea ref='synopsis' cols='20' rows='5' className='form-control' />
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='trailers' className='col-sm-1 col-form-label'>
									Trailers
								</label>
								<div className='col-sm-7'>
									<input type='text' ref='trailers' className='form-control' />
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='status' className='col-sm-1 col-form-label'>
									Status
								</label>
								<div className='col-sm-7'>
									<select ref='status' className='form-control' defaultValue=''>
										<option selected hidden>
											Choose One
										</option>
										<option value='Playing Now'>Playing Now</option>
										<option value='Coming Soon'>Coming Soon</option>
									</select>
								</div>
							</div>
							<div className='form-group row'>
								<label htmlFor='image' className='col-sm-1 col-form-label'>
									Image
								</label>
								<div className='col-sm-7'>
									<input type='text' ref='image' className='form-control' />
								</div>
							</div>
							<div className='form-group'>
								<button type='button' className='btn cgv-btn' onClick={this.addData}>
									Create Data
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default AddPage;
