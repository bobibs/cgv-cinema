import React, { Component } from 'react';
import Axios from 'axios';
import Numeral from 'numeral';
import { API_URL } from '../api';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Loader from 'react-loader-spinner';

class BookNow extends Component {
	state = {
		dataFilm: {},
		seats: 260,
		baris: 0,
		booking: [],
		jam: 12,
		pilihan: [],
		harga: 0,
		jumlahTiket: 0,
		openModalCart: false,
		redirectHome: false,
		loading: true
	};

	componentDidMount() {
		this.jamChange();
	}

	jamChange = () => {
		const studioId = this.props.location.state.studioId;
		const movieId = this.props.match.params.id;
		const dataFilmBook = this.props.location.state;

		Axios.get(`${API_URL}studios/${studioId}`)
			.then(studioRes => {
				Axios.get(`${API_URL}orders?movieId=${movieId}&orderId=${studioRes.id}`)
					.then(orderRes => {
						// console.log('orderRes', orderRes.data);
						const arrOrder = [];
						orderRes.data.forEach(val => {
							arrOrder.push(Axios.get(`${API_URL}ordersDetail?orderId=${val.id}`));
						});
						const arrOrder2 = [];
						Axios.all(arrOrder)
							.then(axiosAllRes => {
								axiosAllRes.forEach(val => {
									arrOrder2.push(...val.data);
								});
								this.setState({
									dataFilm: dataFilmBook,
									seats: studioRes.data.jumlahKursi,
									baris: studioRes.data.jumlahKursi / 20,
									booking: arrOrder2,
									loading: false
								});
							})
							.catch(axiosAllErr => console.log('axiosAllErr', axiosAllErr));
					})
					.catch(orderErr => console.log('orderErr', orderErr));
			})
			.catch(studioErr => console.log('studioErr', studioErr));
	};

	buttonJam = val => {
		this.setState({ jam: val, pilihan: [] });
		this.jamChange();
	};

	pilihSeat = (row, seat) => {
		const { pilihan } = this.state;
		pilihan.push({ row, seat });
		this.setState({ pilihan });
	};

	cancelSeat = (row, seat) => {
		const { pilihan } = this.state;
		const rows = row;
		const seats = seat;
		const cancelArr = [];

		for (let i = 0; i < pilihan.length; i++) {
			if (pilihan[i].row !== rows || pilihan[i].seat !== seats) {
				cancelArr.push(pilihan[i]);
			}
		}
		this.setState({ pilihan: cancelArr });
	};

	orderClick = () => {
		const { id } = this.props.reducer;
		const { dataFilm, jam } = this.state;

		const userId = id;
		const movieId = dataFilm.id;
		const pilihan = this.state.pilihan;
		const jadwal = jam;
		const totalHarga = this.state.pilihan.length * 25000;
		const bayar = false;
		const dataOrders = {
			userId,
			movieId,
			jadwal,
			totalHarga,
			bayar
		};

		Axios.post(`${API_URL}orders`, dataOrders)
			.then(res => {
				const dataOrdersDetail = [];
				pilihan.forEach(val => {
					dataOrdersDetail.push({
						orderId: res.data.id,
						seat: val.seat,
						row: val.row
					});
				});
				const dataOrdersDetail2 = [];
				dataOrdersDetail.forEach(val => {
					dataOrdersDetail2.push(Axios.post(`${API_URL}ordersDetail`, val));
				});
				Axios.all(dataOrdersDetail2)
					.then(resAxiosAll => {
						this.setState({ openModalCart: true });
					})
					.catch(errAxiosAll => console.log('errAxiosAll', errAxiosAll));
			})
			.catch(err => console.log(err));
	};

	renderSeat = () => {
		const arrSeat = [];
		const { baris, seats, pilihan, booking } = this.state;

		for (let i = 0; i < baris; i++) {
			arrSeat.push([]);
			for (let j = 0; j < seats / baris; j++) {
				arrSeat[i].push(1);
			}
		}

		for (let j = 0; j < booking.length; j++) {
			arrSeat[booking[j].row][booking[j].seat] = 3;
		}

		for (let a = 0; a < pilihan.length; a++) {
			arrSeat[pilihan[a].row][pilihan[a].seat] = 2;
		}

		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const renderSeatt = arrSeat.map((val, index) => {
			return (
				<div key={index} style={{ marginBottom: '20px' }}>
					{val.map((val1, i) => {
						if (val1 === 3) {
							return (
								<button
									type='button'
									key={i}
									className='cgv-btn-disable bg-danger rounded text-center mr-2 mt-2'
									disabled>
									{alphabet[index] + (i + 1)}
								</button>
							);
						} else if (val1 === 2) {
							return (
								<button
									type='button'
									key={i}
									className='cgv-btn-order cgv-btn-pilih rounded text-center mr-2 mt-2'
									onClick={() => this.cancelSeat(index, i)}>
									{alphabet[index] + (i + 1)}
								</button>
							);
						}

						return (
							<button
								type='button'
								key={i}
								className='cgv-btn-order rounded text-center mr-2 mt-2'
								onClick={() => this.pilihSeat(index, i)}>
								{alphabet[index] + (i + 1)}
							</button>
						);
					})}
				</div>
			);
		});

		return renderSeatt;
	};

	renderButton = () => {
		const { jadwal } = this.state.dataFilm;
		const { jam } = this.state;
		return jadwal.map((val, index) => {
			if (jam === val) {
				return (
					<button type='button' className='btn cgv-btn mx-2' disabled>
						{val}.00
					</button>
				);
			}
			return (
				<button
					type='button'
					className='btn cgv-btn mx-2'
					onClick={() => this.buttonJam(val)}>
					{val}.00
				</button>
			);
		});
	};

	renderHarga = () => {
		const { pilihan } = this.state;
		const tiket = pilihan.length;
		const harga = tiket * 25000;

		return (
			<div>
				{tiket} tiket x {`Rp. ${Numeral(25000).format('0,0.00')}`} =
				{`Rp. ${Numeral(harga).format('0,0.00')}`}
			</div>
		);
	};

	resetSeat = () => {
		this.setState({ pilihan: [] });
	};

	render() {
		const { id } = this.props.match.params;
		const { loginStatus, role } = this.props.reducer;
		const { redirectHome, openModalCart, loading, pilihan } = this.state;

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

		if (id && loginStatus && role === '') {
			if (redirectHome) {
				return <Redirect to='/' />;
			}
			return (
				<div>
					<Modal isOpen={openModalCart}>
						<ModalHeader>Success</ModalHeader>
						<ModalBody>Cart Berhasil di Tambah!</ModalBody>
						<ModalFooter>
							<button
								type='button'
								className='btn btn-sm cgv-btn'
								onClick={() => this.setState({ redirectHome: true })}>
								Close
							</button>
						</ModalFooter>
					</Modal>

					<center>
						<div className='m-2'>
							{loading ? null : this.renderButton()}
							<div style={{ marginTop: '10px' }}>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div style={{ marginRight: '20px' }}>
										{pilihan.length ? (
											<button
												type='button'
												className='btn btn-sm cgv-btn mt-3'
												onClick={this.orderClick}>
												Order
											</button>
										) : null}
									</div>
									<div>
										{pilihan.length ? (
											<button
												type='button'
												className='btn btn-sm cgv-btn mt-3'
												onClick={this.resetSeat}>
												Reset All
											</button>
										) : null}
									</div>
								</div>
							</div>
							<div style={{ marginTop: '30px' }}>
								{pilihan.length ? this.renderHarga() : null}
							</div>
						</div>
					</center>

					<div className='d-flex justify-content-center mt-4'>
						<div>{loading ? null : this.renderSeat()}</div>
					</div>
				</div>
			);
		}
		return <Redirect to='/*' />;
	}
}

const mapStateToProps = state => {
	return {
		reducer: state.LogReducer
	};
};

export default connect(mapStateToProps)(BookNow);
