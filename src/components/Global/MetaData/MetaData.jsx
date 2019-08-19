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
        <meta name='distribution' content='global' />
        <meta name='googlebot' content='noodp' />
        <meta property='og:site_name' content='Active drive' />
        <meta property='og:title' content={ displayedPageTitle } />
        <meta property='og:description' content={ pageDescription } />
        <meta property='og:image' content='https://photos.google.com/u/1/photo/AF1QipM2tDKMbHlh-_-CHQAI1N9s-5Uyf15LLn0-hK3P' />
        <meta property='og:url' content='https://www.activedriverentacar.com/' />
      </Helmet>
    );
  }
};

export default MetaData;
