import React, { Component } from 'react';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
import Col from '../../Global/Column/Column';
import { scrollToElement } from '../../../utils/helpers';

import './BookButton.scss';

const labelMap = {
  'en-US': 'Book now',
  'sr-Latn': 'Rezerviši odmah'
}

class BookButton extends Component {
  handleClick = () => {
    scrollToElement('book');
  }

  render() {
    const {
      locale,
    } = this.props;

    return (
      <div className='BookButton-wrapper'>
        <button
          className='BookButton'
          onClick={ this.handleClick }
        >
          { labelMap[locale] }
        </button>
      </div>
    )
  }
}


export default BookButton;

