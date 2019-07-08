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
    } = this.props;

    return(
      <div className='Discount-wrapper'>
        <Container className='Discount-container'>
          <Grid>
            <Col
              sm={ 3 }
              md={ 8 }
              className='Discount'
            >
              <h2>{data}</h2>
            </Col>
            <Col
              sm={ 1 }
              md={ 4 }
            >
              <BookButton />
            </Col>
          </Grid>
        </Container>
      </div>
    )
  }
}


export default Discount;

