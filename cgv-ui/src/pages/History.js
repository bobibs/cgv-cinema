import React, { Component } from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Table, Modal, ModalBody } from 'reactstrap';
import { API_URL } from '../api';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class History extends Component {
	state = {
		dataCart: null,
		loading: true,
		modalDetail: false,
		detailSeat: null
	};

	componentDidMount() {
		const { id } = this.props.reducer;

		Axios.get(`${API_URL}orders?_expand=movie&userId=${id}&bayar=true`).then(
			res => {
				let dataCart1 = res.data;
				let qtyArr1 = [];

				res.data.forEach(val => {
					qtyArr1.push(Axios.get(`${API_URL}ordersDetail?orderId=${val.id}`));
				});

				let qtyArr2 = [];
				Axios.all(qtyArr1)
					.then(res1 => {
						res1.forEach(val => {
							qtyArr2.push(val.data);
						});

						let dataCart2 = [];
						dataCart1.forEach((val, index) => {
							dataCart2.push({ ...val, qty: qtyArr2[index] });
						});
						this.setState({ dataCart: dataCart2 });
					})
					.catch(err1 => console.log(err1));
			}
		);
	}

	renderCart = () => {
		const { dataCart } = this.state;
		if (dataCart !== null) {
			if (dataCart.length === 0) {
				return (
					<tr>
						<td>Belum ada history apapun</td>
					</tr>
				);
			}
			return dataCart.map((val, index) => {
				console.log(index);
				return (
					<tr key={index}>
						<td style={{ width: '100px' }}>{index + 1}</td>
						<td style={{ width: '300px' }}>{val.movie.title}</td>
						<td style={{ width: '100px' }}>{val.jadwal}.00</td>
						<td style={{ width: '100px' }}>{val.qty.length}</td>
						<td style={{ width: '100px' }}>Rp {val.totalHarga}</td>
					</tr>
				);
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

		if (id && role === '') {
			return (
				<div>
					<center>
						<h1 className='my-3'>History</h1>
						<Table style={{ textAlign: 'center' }}>
							<thead>
								<tr>
									<th style={{ width: '100px' }}>No</th>
									<th style={{ width: '300px' }}>Title</th>
									<th style={{ width: '100px' }}>Jadwal</th>
									<th style={{ width: '100px' }}>Qty</th>
									<th style={{ width: '100px' }}>Harga</th>
								</tr>
							</thead>
							<tbody>{this.renderCart()}</tbody>
						</Table>
					</center>
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

export default connect(mapStateToProps)(History);
