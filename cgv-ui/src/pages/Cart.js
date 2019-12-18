import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Table, Modal, ModalBody } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { API_URL } from '../api';
import { addCartAction } from '../redux/actions';

class Cart extends Component {
	state = {
		datacart: null,
		detailseat: null,
		totalharga: 0,
		modalDetail: false
	};

	componentDidMount() {
		const { id } = this.props.reducer;
		Axios.get(`${API_URL}orders?_expand=movie&userId=${id}&bayar=false`)
			.then(res => {
				const datacart = res.data;

				const qtyarr = [];
				res.data.forEach(elm => {
					qtyarr.push(Axios.get(`${API_URL}ordersDetail?orderId=${elm.id}`));
				});
				const qtyfinal = [];
				Axios.all(qtyarr)
					.then(res1 => {
						res1.forEach(val => {
							qtyfinal.push(val.data);
						});
						const datafinal = [];
						datacart.forEach((val, index) => {
							datafinal.push({ ...val, qty: qtyfinal[index] });
						});
						this.setState({ datacart: datafinal });
					})
					.catch(err => {
						console.log(err);
					});
			})
			.catch(err => {
				console.log(err);
			});
	}

	renderCart = () => {
		console.log(this.state.datacart);
		if (this.state.datacart !== null) {
			if (this.state.datacart.length === 0) {
				return (
					<tr className='text-center'>
						<h3 className='my-4'>Cart Empty</h3>
					</tr>
				);
			}
			return this.state.datacart.map((val, index) => {
				return (
					<tr key={index}>
						<td style={{ width: '100px' }}>{index + 1}</td>
						<td style={{ width: '300px' }}>{val.movie.title}</td>
						<td style={{ width: '100px' }}>{val.jadwal}.00</td>
						<td style={{ width: '100px' }}>{val.qty.length}</td>
						<td style={{ width: '100px' }}>Rp {val.totalHarga}</td>
						<td style={{ width: '100px' }}>
							<button
								type='button'
								className='btn btn-sm cgv-btn'
								onClick={() => this.btnDetail(index)}>
								Details
							</button>
						</td>
					</tr>
				);
			});
		}
	};

	btnCheckOut = () => {
		const pesanan = this.state.datacart;
		for (let i = 0; i < pesanan.length; i++) {
			const data = {
				userId: pesanan[i].userId,
				movieId: pesanan[i].movieId,
				jadwal: pesanan[i].jadwal,
				totalHarga: pesanan[i].totalHarga,
				bayar: true,
				id: pesanan[i].id
			};
			const id = data.id;

			Axios.put(`${API_URL}orders/${id}`, data)
				.then(res => {
					this.componentDidMount();
				})
				.catch(err => {
					console.log(err);
				});
		}
	};

	btnDetail = index => {
		this.setState({ modalDetail: true });
		const id = this.state.datacart[index].id;
		Axios.get(`${API_URL}ordersDetail?orderId=${id}`)
			.then(res => {
				const detailfilm = res.data;
				const seat = [];
				const row = [];
				detailfilm.map((val, index) => {
					seat.push(val.seat);
					row.push(val.row);
				});
				const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
				const posisi = [];
				for (let i = 0; i < seat.length; i++) {
					for (let j = 0; j < alphabet.length; j++) {
						if (row[i] === j) {
							posisi.push(alphabet[j] + (seat[i] + 1));
						}
					}
				}
				this.setState({ detailseat: posisi });
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		const { id, role } = this.props.reducer;
		const { modalDetail, detailseat } = this.state;

		if (id && role === '') {
			return (
				<div>
					<Modal
						isOpen={modalDetail}
						toggle={() => this.setState({ modalDetail: false })}>
						<ModalBody className='text-center'>
							<Table className='text-center'>
								<thead>
									<tr>
										<th>Total</th>
										<th>Seat</th>
									</tr>
								</thead>
								<tbody>
									{detailseat ? (
										<tr>
											<th> {detailseat.length} </th>
											<th>
												{detailseat.map(val => {
													return val + ' ';
												})}
											</th>
										</tr>
									) : null}
								</tbody>
							</Table>
							<button
								type='button'
								className='btn btn-sm cgv-btn'
								onClick={() => this.setState({ modalDetail: false })}>
								Close
							</button>
						</ModalBody>
					</Modal>
					<center>
						<h1>Cart</h1>
						<Table style={{ textAlign: 'center' }}>
							<thead>
								<tr>
									<th style={{ width: '100px' }}>No</th>
									<th style={{ width: '300px' }}>Title</th>
									<th style={{ width: '100px' }}>Jadwal</th>
									<th style={{ width: '100px' }}>Qty</th>
									<th style={{ width: '100px' }}>Harga</th>
									<th style={{ width: '100px' }}>Detail</th>
								</tr>
							</thead>
							<tbody>{this.renderCart()}</tbody>
						</Table>
						<Link to='/history'>
							<button
								type='button'
								className='btn btn-sm cgv-btn'
								onClick={this.btnCheckOut}>
								Checkout
							</button>
						</Link>
					</center>
				</div>
			);
		}
		return <Redirect to='/*' />;
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		reducer: state.LogReducer
	};
};

export default connect(mapStateToProps, { addCartAction })(Cart);
