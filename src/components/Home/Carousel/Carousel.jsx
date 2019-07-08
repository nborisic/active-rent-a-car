import React, { Component, Fragment } from 'react';
import Container from '../../Global/Container/Container';
import Swiper from 'react-id-swiper';
import Ratio from 'react-ratio';

import './Carousel.scss';
import 'react-id-swiper/lib/styles/scss/swiper.scss';

class Carousel extends Component {

  renderImages = () => {
    const {
      images,
    } = this.props;

    return images.map(image => {
      return (
        <div
          key={ image.fields.file.url }
          className='Carousel-image'
          style={ { backgroundImage: `url(${ image.fields.file.url })` } }
        />
      )
    })
  }

  render() {
    const params = {
      slidesPerView: 1,
      rebuildOnUpdate: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      loop: true,
      autoplay: true,
      delay: 6000,
    }

    console.log(this.props.images);


    return(
      <Ratio
        ratio={ 16/9 }
      >
        <Swiper { ...params }>
          { this.renderImages() }
        </Swiper>
      </Ratio>
    )
  }
}


export default Carousel;

