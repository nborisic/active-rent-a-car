import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { scrollToElement } from '../../../utils/helpers';
import { getReservedClassData } from '../../../reducers/reservation';

import './BookButton.scss';

const labelMap = {
  'en-US': 'Book now',
  'sr-Latn': 'Rezerviši odmah'
}

const labelMapShort = {
  'en-US': 'Book',
  'sr-Latn': 'Rezerviši'
}

class BookButton extends Component {
  handleClick = () => {
    const {
      classToReserve,
      dispatch,
      locale,
    } = this.props;

    scrollToElement('book');

    if(classToReserve) {
      dispatch(getReservedClassData(classToReserve, locale))
    }

  }

  render() {
    const {
      locale,
      className,
      isDiscount,
    } = this.props;

    const buttonClassName = cx('BookButton-wrapper',{
      [className]: className,
    })

    return (
      <div className={ buttonClassName }>
        <button
          className='BookButton'
          onClick={ this.handleClick }
        >
          <span className='BookButton-label'>{ isDiscount ? labelMap[locale]  : labelMapShort[locale] }</span>
          <span className='BookButton-label--sm'>{ labelMap[locale] }</span>
        </button>
      </div>
    )
  }
}


export default connect((state) => ({
}))(BookButton);

