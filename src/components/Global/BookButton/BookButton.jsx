import React, { Component, Fragment } from 'react';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
import Col from '../../Global/Column/Column';

import './BookButton.scss';

class BookButton extends Component {
  render() {
    return(
      <div className='BookButton-wrapper'>
        <Container className='BookButton-container'>
          <Grid>
            <Col
              sm={ 3 }
              md={ 6 }
            >
              <div className='BookButton'>Book Now</div>
            </Col>
          </Grid>
        </Container>
      </div>
    )
  }
}


export default BookButton;

