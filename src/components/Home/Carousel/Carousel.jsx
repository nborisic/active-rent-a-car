import React, { Component, Fragment } from 'react';
import Ratio from 'react-ratio';
import { Carousel } from 'react-responsive-carousel';

import './Carousel.scss';


class Swiper extends Component {
  componentDidMount() {
    scrollTo(0,0);
  }

  renderImages = () => {
    const {
      images,
    } = this.props;

    if(!images) {
      return null
    }

    return images.map(image => {
      return (
        <img
          key={ image.sys.id }
          className='Carousel-image'
          src={`https:${ image.fields.file.url }`}
        />
      )
    })
  }

  render() {
    return(
      <Ratio
        ratio={ 16/9 }
      >
        <Carousel
          autoPlay
          showThumbs={false}
          infiniteLoop={true}
          showArrows={ false }
          showStatus={ false }
          interval={ 5000 }
        >
        {/* <Swiper { ...params }> */}
          { this.renderImages() }
        {/* </Swiper> */}
        </Carousel>
      </Ratio>
    )
  }
}


export default Swiper;

