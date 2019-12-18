import React, { Component } from 'react';
import Logo from '../images/404.png';

class Page404 extends Component {
	render() {
		return (
			<div>
				<div>
					<img
						src={Logo}
						alt='404 Not Found'
						style={{ width: '100%', height: '603px' }}
					/>
				</div>
			</div>
		);
	}
}

export default Page404;
