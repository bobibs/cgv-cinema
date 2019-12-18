import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import Logo from '../images/cgv-logo.png';
import {
	FaSignInAlt,
	FaUser,
	FaSignOutAlt,
	FaCartArrowDown,
	FaHistory
} from 'react-icons/fa';
import { logoutAction } from '../redux/actions';
import { connect } from 'react-redux';

class Header extends Component {
	state = {
		isOpen: false
	};

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	logOutClick = () => {
		localStorage.removeItem('userId');
		this.props.logoutAction();
	};

	render() {
		const { isOpen } = this.state;
		const { loginStatus, id, role } = this.props.reducer;
		console.log(role);
		return (
			<div>
				<Navbar expand='md' className='cgv-navbar'>
					<div className='cgv-nav-left'>
						<NavbarBrand>
							<NavLink className='cgv-nav-link' href='/'>
								<img src={Logo} alt='CGV Cinemas' />
							</NavLink>
						</NavbarBrand>
					</div>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={isOpen} navbar>
						<Nav className='cgv-nav' navbar>
							<div className='cgv-nav-center'>
								<NavItem>
									<NavLink className='cgv-nav-link' href='/now-playing'>
										Now Playing
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className='cgv-nav-link' href='/'>
										Home
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className='cgv-nav-link' href='/upcoming-film'>
										Upcoming Film
									</NavLink>
								</NavItem>
							</div>
							<div className='cgv-nav-right mt-3'>
								{loginStatus && role !== 'admin' ? (
									<NavItem>
										<NavLink className='cgv-nav-link' href={`/manage-account/${id}`}>
											<FaUser />
										</NavLink>
									</NavItem>
								) : null}

								{loginStatus && role !== 'admin' ? (
									<NavItem>
										<NavLink className='cgv-nav-link' href='/history'>
											<FaHistory />
										</NavLink>
									</NavItem>
								) : null}

								{loginStatus && role !== 'admin' ? (
									<NavItem>
										<NavLink className='cgv-nav-link' href='/cart'>
											<div className='d-flex mt-1'>
												<FaCartArrowDown />
												<p style={{ marginLeft: '3px' }}>{this.props.cartReducer}</p>
											</div>
										</NavLink>
									</NavItem>
								) : null}

								{loginStatus && role === 'admin' ? (
									<NavItem>
										<NavLink className='cgv-nav-link' href='/manage-admin'>
											<p>Manage Admin</p>
										</NavLink>
									</NavItem>
								) : null}

								{loginStatus && role === 'admin' ? (
									<NavItem>
										<NavLink className='cgv-nav-link' href='/manage-studio'>
											<p>Manage Studio</p>
										</NavLink>
									</NavItem>
								) : null}

								{loginStatus ? (
									<NavItem>
										<NavLink
											className='cgv-nav-link'
											href='/'
											onClick={() => this.logOutClick()}>
											<FaSignOutAlt />
										</NavLink>
									</NavItem>
								) : null}

								{loginStatus === false ? (
									<NavItem>
										<NavLink className='cgv-nav-link' href='/login'>
											<FaSignInAlt />
										</NavLink>
									</NavItem>
								) : null}
							</div>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log('reducer', state.CartReducer);
	return {
		reducer: state.LogReducer,
		cartReducer: state.CartReducer
	};
};

export default connect(mapStateToProps, { logoutAction })(Header);
