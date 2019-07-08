import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
const contentful = require('contentful');
import get from 'lodash/get';
import { withWindow } from 'react-window-decorators';
import { spaceId, accessToken, locales } from '../../constants/contentful';
import PageContainer from '../../components/Global/PageContainer/PageContainer';
import { getData } from '../../reducers/home'
import NavBar from '../../components/Home/NavBar/NavBar';
import Header from '../../components/Home/Header/Header';
import Cars from '../../components/Home/Cars/Cars';
import Discount from '../../components/Home/Discount/Discount';
import Carousel from '../../components/Home/Carousel/Carousel';
import Footer from '../../components/Global/Footer/Footer';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Container from '../../components/Global/Container/Container';

class Home extends Component {
  constructor(props) {
    super(props);

    if(!props.homeData.aboutUs) {
      const entriesToGet = ['aboutUs', 'carousel', 'discountActions', 'carsInStoc', 'footer', 'navBar', 'header'].join(',', ',');

      const client = contentful.createClient({
        space: spaceId,
        accessToken: accessToken,
      })

      client.getEntries({
        include: 10,
        'sys.contentType.sys.id[in]': entriesToGet,
        // locale: locales[locale],
      })
      .then((response) => {
        props.dispatch(getData(response.items))
      })
      .catch(console.error)
    }
  }

  render() {
    const {
      homeData: {
        navBar,
        carouselImages,
        header,
        cars,
        discount,
        aboutUs,
        footer,
      },
      breakpoint,
    } = this.props;

    const body = documentToHtmlString(aboutUs || '');
    console.log('navBar',navBar);

    return (
      <Fragment>
        <Header data={ header }/>
        <NavBar
          data={ navBar }
          breakpoint={ breakpoint }
        />
        <Carousel images={ carouselImages }/>
        <Container>
          <div dangerouslySetInnerHTML={ { __html: body } }></div>
        </Container>
        <Discount data={ discount } />
        <Cars data={ cars } />
        <Footer data={ footer } logo={ get(header, 'logo.fields.file.url') }/>
      </Fragment>
    );
  }
}

export default connect((state) => ({
  homeData: get(state, 'home.data', []),
}))(withWindow(Home));
