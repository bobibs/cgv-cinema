import React, { Component } from 'react';
import Slider from 'react-slick';
import Carousel1 from '../images/carousel-1.jpg';
import Carousel2 from '../images/carousel-2.jpg';
import Carousel3 from '../images/carousel-3.jpg';

class Carousel extends Component {
	render() {
		const settings = {
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			speed: 4000,
			autoPlaySpeed: 1000,
			cssEase: 'linear',
			arrows: false
		};
		return (
			<div style={{ height: '95vh' }}>
				<Slider {...settings}>
					<div>
						<img
							src={Carousel1}
							alt='Carousel 1'
							style={{ height: '630px', width: '100%' }}
						/>
					</div>
					<div>
						<img
							src={Carousel2}
							alt='Carousel 2'
							style={{ height: '630px', width: '100%' }}
						/>
					</div>
					<div>
						<img
							src={Carousel3}
							alt='Carousel 3'
							style={{ height: '630px', width: '100%' }}
						/>
					</div>
				</Slider>
			</div>
		);
	}
}

export default Carousel;
