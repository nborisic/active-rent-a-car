import React, { Component } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { getPriceData } from '../../reducers/price';
import Container from '../../components/Global/Container/Container';
import Grid from '../../components/Global/Grid/Grid';
import Col from '../../components/Global/Column/Column';
import { getContentfulData } from '../../utils/helpers';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import './PriceList.scss';
import BookButton from '../../components/Global/BookButton/BookButton';


const headingLabels = {
  ['en-US']: {
    class: 'Class',
    vehicle: 'Vehicle make',
    elevenToFifteenDayes: '11-15',
    fourToSixDays:  '4-6',
    sevenToTenDays: '7-10',
    sixteendPlusDays: '16+',
    twoToThreeDays: '2-3',
    timeRange: 'Prices for the period form',
    days: 'days'
  },
  ['sr-Latn']: {
    class: 'Klasa',
    vehicle: 'Marka vozila',
    elevenToFifteenDayes: '11-15',
    fourToSixDays:  '4-6',
    sevenToTenDays: '7-10',
    sixteendPlusDays: '16+',
    twoToThreeDays: '2-3',
    timeRange: 'Cene za period od',
    days: 'dana'
  }
}

const entriesToGet = ['allClasses'].join(',', ',');

class PriceList extends Component {
  constructor(props) {
    super(props)

    const {
      locale,
      dispatch,
    } = props;

    scrollTo(0,0);

    if(props.priceData && props.priceData[locale] && !props.priceData[locale].price) {
      getContentfulData(locale, entriesToGet, getPriceData, dispatch)
    }
  }

  renderHeader = (locale) => {
    return (
      <div className='PriceList-heading'>
        <Grid >
          <Col md={1}>{ headingLabels[locale].class }</Col>
          <Col md={4}>{ headingLabels[locale].vehicle }</Col>
          <Col md={1}>{ headingLabels[locale].twoToThreeDays }<span className='PriceList-days--sm'> { headingLabels[locale].days }</span></Col>
          <Col md={1}>{ headingLabels[locale].fourToSixDays }<span className='PriceList-days--sm'> { headingLabels[locale].days }</span></Col>
          <Col md={1}>{ headingLabels[locale].sevenToTenDays }<span className='PriceList-days--sm'> { headingLabels[locale].days }</span></Col>
          <Col md={1}>{ headingLabels[locale].elevenToFifteenDayes }<span className='PriceList-days--sm'> { headingLabels[locale].days }</span></Col>
          <Col md={1}>{ headingLabels[locale].sixteendPlusDays }<span className='PriceList-days--sm'> { headingLabels[locale].days }</span></Col>
          <Col md={2} className='PriceList-days'>{ headingLabels[locale].days }</Col>
        </Grid>
      </div>
    )
  }

  renderSingleCar = (carClass, car) => {
    const {
      locale,
    } = this.props;

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
            classToReserve={ car.class }
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
        <Grid key= {car.sys.id } >
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
    } = this.props;

    if(!priceData[locale].price) {
      return null;
    }

    const body = documentToHtmlString(get(priceData[locale], 'price.additionalNotes') || '');

    return(
      <Container className='PriceList'>
        <div className='PriceList-title'>{ headingLabels[locale].timeRange } <span>{ priceData[locale].price.timeSpan }</span></div>
        <div className='PriceList-prices--sm'>{ this.renderSmallPriceList() }</div>
        <div className='PriceList-prices'>{ this.renderPriceList() }</div>
        <div dangerouslySetInnerHTML={ { __html: body } } ></div>
      </Container>
    )
  }
}

export default connect((state) => ({
  priceData: get(state, 'price.data', []),
}))(PriceList);

