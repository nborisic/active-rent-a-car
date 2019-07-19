import React, { Component, Fragment } from 'react';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
import Col from '../../Global/Column/Column';
import BookButton from '../../Global/BookButton/BookButton';

import './Discount.scss';

class Discount extends Component {
  render() {
    const {
      data,
      locale,
    } = this.props;

    return(
      <div className='Discount-wrapper'>
        <Container className='Discount-container'>
          <Grid>
            <Col
              sm={ 2 }
              md={ 8 }
              className='Discount'
            >
              <h2>{ data }</h2>
            </Col>
            <Col
              sm={ 2 }
              md={ 4 }
              className='Discount-button'
            >
              <BookButton locale={ locale } isDiscount />
            </Col>
          </Grid>
        </Container>
      </div>
    )
  }
}


export default Discount;

