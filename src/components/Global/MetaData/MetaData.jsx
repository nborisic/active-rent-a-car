import React, { Component } from 'react';
import Helmet from 'react-helmet';

class MetaData extends Component {
  render () {
    const {
      language,
    } = this.props;

    const displayedPageTitle = language === 'sr' ? 'Active drive rent a car Beograd' : 'Active drive rent a car Belgrade';
    const pageDescription = 'Agencija za iznajmljivanje automobila stacionirana u Beogradu';
    const pageKeywords = 'car, cars, auto, automobili, iznajmljivanje, rentiranje, rent a car, rent, rent-a-car, beograd, belgrade, belgrad, airport, aerodrom, ajrodrom';

    return (
      <Helmet>
        <title>{ displayedPageTitle }</title>
        <meta name='description' content={ pageDescription } />
        <meta name='keywords' content={ pageKeywords } />
      </Helmet>
    );
  }
};

export default MetaData;
