import React, { Component } from 'react';
import cx from 'classnames';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
import Col from '../../Global/Column/Column';
import { scrollToElement } from '../../../utils/helpers';

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
    scrollToElement('book');
  }

  render() {
    const {
      locale,
      className,
      isShort,
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
          { isShort ? labelMapShort[locale] :  labelMap[locale] }
        </button>
      </div>
    )
  }
}


export default BookButton;

