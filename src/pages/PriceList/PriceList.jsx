import React, { Component, Fragment } from 'react';
const contentful = require('contentful');
import { withWindow } from 'react-window-decorators';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { spaceId, accessToken } from '../../constants/contentful';
import { getPriceData } from '../../reducers/price';
import Container from '../../components/Global/Container/Container';
import Grid from '../../components/Global/Grid/Grid';
import Col from '../../components/Global/Column/Column';

import './PriceList.scss';
import BookButton from '../../components/Global/BookButton/BookButton';


const headingLabels = {
  ['en-US']: {
    class: 'Class',
    vehicle: 'Vehicle make',
    elevenToFifteenDayes: '11-15 days',
    fourToSixDays:  '4-6 days',
    sevenToTenDays: '7-10 days',
    sixteendPlusDays: '16+ days',
    twoToThreeDays: '2-3 days',
    timeRange: 'Prices for the period form'
  },
  ['sr-Latn']: {
    class: 'Klasa',
    vehicle: 'Marka vozila',
    elevenToFifteenDayes: '11-15 dana',
    fourToSixDays:  '4-6 dana',
    sevenToTenDays: '7-10 dana',
    sixteendPlusDays: '16+ dana',
    twoToThreeDays: '2-3 dana',
    timeRange: 'Cene za period od',
  }
}

class PriceList extends Component {x
  componentDidMount() {
    const {
      locale,
    } = this.props;


    scrollTo(0,0);

      this.getContentfulData(locale)

  }

  getContentfulData = (locale) => {
    const entriesToGet = ['allClasses'].join(',', ',');

    const client = contentful.createClient({
      space: spaceId,
      accessToken: accessToken,
    });

    client.getEntries({
      include: 10,
      'sys.contentType.sys.id[in]': entriesToGet,
      locale,
    })
    .then((response) => {
      this.props.dispatch(getPriceData(response.items, locale))
    })
    .catch(console.error)
  }

  renderHeader = (locale) => {
    return (
      <div className='PriceList-heading'>
        <Grid >
          <Col md={1}>{ headingLabels[locale].class }</Col>
          <Col md={4}>{ headingLabels[locale].vehicle }</Col>
          <Col md={1}>{ headingLabels[locale].twoToThreeDays }</Col>
          <Col md={1}>{ headingLabels[locale].fourToSixDays }</Col>
          <Col md={1}>{ headingLabels[locale].sevenToTenDays }</Col>
          <Col md={1}>{ headingLabels[locale].elevenToFifteenDayes }</Col>
          <Col md={1}>{ headingLabels[locale].sixteendPlusDays }</Col>
        </Grid>
      </div>
    )
  }

  renderSingleCar = (carClass, car) => {
    const {
      locale,
      breakpoint,
    } = this.props;

    const isSmallBp = breakpoint === 'sm';

    return (
      <Grid>
        <Col md={1}>{ carClass }</Col>
        <Col md={4}>{ car.name }</Col>
        <Col md={1}>{ car.twoToThreeDaysPrice }</Col>
        <Col md={1}>{ car.fourToSixDaysPrice }</Col>
        <Col md={1}>{ car.sevenToTenDaysPrice }</Col>
        <Col md={1}>{ car.elevenToFifteenDayesPrice }</Col>
        <Col md={1}>{ car.sixteendPlusDaysPrice }</Col>
        <Col md={2}>
          <BookButton
            className='PriceList-bookButton'
            locale={ locale }
            isShort={ !isSmallBp }
          />
        </Col>
      </Grid>
    );
  }

  renderCars = (item) => {
    return item.fields.cars.map(car => {
      return (
        <div className='PriceList-car' key={ car.sys.id }>
          { this.renderSingleCar(item.sys.contentType.sys.id[0].toUpperCase(), car.fields ) }
        </div>
      );
    })

  }

  renderPriceList = () => {
    const {
      priceData,
      locale,
    } = this.props;

    return priceData[locale].price.klase.map((item) => {
      return (
        <div key={ item.sys.id } className='PriceList-listClass'>
          { this.renderHeader(locale) }
          { this.renderCars(item) }
        </div>
      )
    })
  }

  renderSmallPriceList = () => {
    const {
      priceData,
      locale,
    } = this.props;

    return priceData[locale].price.klase.map((item) => {
      return (
        <div key={ item.sys.id } className='PriceList-listClass'>
          { this.renderCarSmall(item, item.sys.contentType.sys.id[0].toUpperCase()) }
        </div>
      )
    })
  }

  renderCarSmall = (item, carClass) => {
    const {
      locale,
    } = this.props;

    return item.fields.cars.map((car) => {
      return (
        <Grid>
          <Col sm={2}>
            { this.renderHeader(locale) }
          </Col>
          <Col sm={2} className='PriceList-car--sm'>
            { this.renderSingleCar(carClass, car.fields) }
          </Col>
        </Grid>
      )
    })
  }

  render() {
    const {
      priceData,
      locale,
      breakpoint,
    } = this.props;

    if(!priceData[locale].price) {
      return null;
    }

    const isSmallBp = breakpoint === 'sm';

    return(
      <Container className='PriceList'>
        <div className='PriceList-title'>{ headingLabels[locale].timeRange } <span>{ priceData[locale].price.timeSpan }</span></div>
        { isSmallBp ? this.renderSmallPriceList() : this.renderPriceList() }
      </Container>
    )
  }
}

export default connect((state) => ({
  priceData: get(state, 'price.data', []),
}))(withWindow(PriceList));
