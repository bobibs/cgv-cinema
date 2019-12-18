import React, { Component } from 'react';
import Axios from 'axios';
import { API_URL } from '../api';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class EditPage extends Component {
	state = {
		dataFilm: [],
		jadwal:[12,14,16,18,20],
		editSuccess: false,
		loading: true
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		Axios.get(`${API_URL}movies/${id}`)
			.then(res => {
				this.setState({ dataFilm: [res.data], loading: false });
			})
			.catch(err => console.log(err));
	}
	
	checkBoxEditData = () => {
		const indexArr = [];
		const { jadwal } = this.state
		const dataFilmEdit = this.state.dataFilm[0].jadwal

		for(let i = 0; i < dataFilmEdit.length; i++){
			for(let j = 0; j < jadwal.length; j++){
				if(dataFilmEdit[i] === jadwal[j]){
					indexArr.push(j)
				}
			}
		}

		const checkBox = jadwal
		const checkBoxNew = []
		checkBox.forEach(val => {
			checkBoxNew.push({ jam : val, tampilEdit : false })
		})
		
		indexArr.forEach(val => {
			checkBoxNew[val].tampilEdit = true;
		})

		return checkBoxNew.map((val,index) => {
			if(val.tampilEdit){
				return(
					<div key={index}>
						<input
							type='checkbox'
							ref={`editJadwal${index}`}
							value={val.jam}
						/>
						<span className='mr-2 ml-1'>{val}.00</span>
					</div>
				)
			}
		})

	}

	renderEditData = () => {
		const { dataFilm } = this.state;

		return dataFilm.map((val, index) => {
			return (
				<div style={{ marginTop: '20px', marginLeft: '250px' }}>
					<form className='form' key={index}>
						<div className='form-group row'>
							<label htmlFor='title' className='col-sm-1 col-form-label'>
								Title
							</label>
							<div className='col-sm-7'>
								<input
									type='text'
									ref='title'
									className='form-control'
									defaultValue={val.title}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label htmlFor='duration' className='col-sm-1 col-form-label'>
								Duration
							</label>
							<div className='col-sm-7'>
								<input
									type='text'
									ref='duration'
									className='form-control'
									defaultValue={val.duration}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label htmlFor='cast' className='col-sm-1 col-form-label'>
								Cast
							</label>
							<div className='col-sm-7'>
								<input
									type='text'
									ref='cast'
									className='form-control'
									defaultValue={val.cast}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label htmlFor='director' className='col-sm-1 col-form-label'>
								Director
							</label>
							<div className='col-sm-7'>
								<input
									type='text'
									ref='director'
									className='form-control'
									defaultValue={val.director}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label htmlFor='country' className='col-sm-1 col-form-label'>
								Country
							</label>
							<div className='col-sm-7'>
								<select
									ref='country'
									className='form-control'
									defaultValue={val.country}>
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
								<input
									type='text'
									ref='studio'
									className='form-control'
									defaultValue={val.studio}
								/>
							</div>
						</div>
						<div className="form-group row">
								<label htmlFor='jadwal' className='col-sm-1 col-form-label'>
									Jadwal
								</label>
									{/* {this.checkBoxEditData()} */}
							</div>
						<div className='form-group row'>
							<label htmlFor='synopsis' className='col-sm-1 col-form-label'>
								Synopsis
							</label>
							<div className='col-sm-7'>
								<textarea
									ref='synopsis'
									cols='20'
									rows='5'
									className='form-control'
									defaultValue={val.synopsis}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label htmlFor='trailers' className='col-sm-1 col-form-label'>
								Trailers
							</label>
							<div className='col-sm-7'>
								<input
									type='text'
									ref='trailers'
									className='form-control'
									defaultValue={val.trailers}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label htmlFor='status' className='col-sm-1 col-form-label'>
								Status
							</label>
							<div className='col-sm-7'>
								<select ref='status' className='form-control' defaultValue={val.status}>
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
								<input
									type='text'
									ref='image'
									className='form-control'
									defaultValue={val.image}
								/>
							</div>
						</div>
						<div className='form-group'>
							<button type='button' className='btn cgv-btn' onClick={this.editData}>
								Edit Data
							</button>
						</div>
					</form>
				</div>
			);
		});
	};

	editData = () => {
		this.setState({ loading: true });
		const { id } = this.props.match.params;
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
			synopsis,
			trailers,
			status
		};

		Axios.put(`${API_URL}movies/${id}`, data)
			.then(res => {
				this.setState({ editSuccess: true, loading: false });
			})
			.catch(err => console.log(err));
	};

	render() {
		const { editSuccess, loading } = this.state;

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
			return <Redirect to='/manage-admin' />;
		}
		return (
			<div>
				<div className='container'>
					<div className='text-center mt-3'>
						<h5 className='cgv-h5'>EDIT DATA</h5>
					</div>
					{this.renderEditData()}
				</div>
			</div>
		);
	}
}

export default EditPage;
