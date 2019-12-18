import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from './api';
import { connect } from 'react-redux';
import { loginAction, addCartAction } from './redux/actions';
import Loader from 'react-loader-spinner';

import Header from './components/Header';

import Page404 from './pages/Page404';
import Login from './pages/Login';
import Home from './pages/Home';
import ViewDetails from './pages/ViewDetails';
import BookNow from './pages/BookNow';
import NowPlaying from './pages/NowPlaying';
import UpcomingFilm from './pages/UpcomingFilm';
import ManageAdmin from './pages/ManageAdmin';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import Cart from './pages/Cart';
import Register from './pages/Register';
import ManageStudio from './pages/ManageStudio';
import EditStudio from './pages/EditStudio';
import AddStudio from './pages/AddStudio';
import ManageAccount from './pages/ManageAccount';
import History from './pages/History';

class App extends Component {
	state = {
		loading: true,
		datacart: []
	};
	componentDidMount() {
		const id = localStorage.getItem('userId');

		Axios.get(`${API_URL}users/${id}`)
			.then(res => {
				this.props.loginAction(res.data);
				Axios.get(
					`${API_URL}orders?_expand=movie&UserId=${this.props.reducer.id}&bayar=false`
				)
					.then(res1 => {
						const datacart = res1.data;
						this.setState({
							datacart,
							loading: false
						});
						this.props.addCartAction(this.state.datacart.length);
					})
					.catch(err1 => {
						console.log(err1);
					});
			})
			.catch(err => {
				console.log(err);
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	}

	render() {
		const { loading, datacart } = this.state;
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
				<Header />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/now-playing' component={NowPlaying} />
					<Route exact path='/view-details/:id' component={ViewDetails} />
					<Route exact path='/book-now/:id' component={BookNow} />
					<Route exact path='/upcoming-film' component={UpcomingFilm} />
					<Route exact path='/manage-admin' component={ManageAdmin} />
					<Route exact path='/manage-admin/add-data' component={AddPage} />
					<Route exact path='/manage-admin/edit-data/:id' component={EditPage} />
					<Route exact path='/cart' component={Cart} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/manage-studio' component={ManageStudio} />
					<Route exact path='/manage-studio/add-studio' component={AddStudio} />
					<Route exact path='/history' component={History} />
					<Route
						exact
						path='/manage-studio/edit-studio/:id'
						component={EditStudio}
					/>
					<Route exact path='/manage-account/:id' component={ManageAccount} />
					<Route exact path='/*' component={Page404} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		reducer: state.LogReducer
	};
};

export default connect(mapStateToProps, { loginAction, addCartAction })(App);
