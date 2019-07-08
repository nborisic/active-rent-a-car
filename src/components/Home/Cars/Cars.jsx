import React, { Component, Fragment } from 'react';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
import Col from '../../Global/Column/Column';
import Ratio from 'react-ratio';

import './Cars.scss';

class Cars extends Component {
  renderCars = () => {
    const {
      data,
    } = this.props;


    return data.map((car, index) => {
      const isWideImage = index === 4 || index === 5;

      return (
        <Col
          key={ car.fields.file.url }
          md={ isWideImage ? 6 : 3 }
          sm={ isWideImage ? 6 : 4 }
          className='Cars-imageWrapper'
        >
          <Ratio ratio={ isWideImage ? 8/3 : 4/3 }>
            <div
              className='Cars-image'
              style={ { backgroundImage: `url(${ car.fields.file.url })` } }
            />
          </Ratio>
        </Col>
      )
    })
  }

  render() {
    return(
      <Container>
        <Grid>
          { this.renderCars() }
        </Grid>
      </Container>
    )
  }
}


export default Cars;

