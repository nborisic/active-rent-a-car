import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
const contentful = require('contentful');
import omit from 'lodash/omit';
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
import Form from '../../components/Global/Form/Form';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Container from '../../components/Global/Container/Container';
import Conditions from '../Conditions/Conditions';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    const locale = props.match.params.language ? locales[props.match.params.language] : locales.sr;

    if(!props.homeData[locale].aboutUs) {
      this.getContentfulData(locale)
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          language,
        }
      }
    } = this.props;

    const locale = language ? locales[language] : locales.sr;

    if (prevProps.match.params.language !== language && !this.props.homeData[locale].aboutUs) {
      this.getContentfulData(locale)
    }

  }

  getContentfulData = (locale) => {
    const entriesToGet = ['aboutUs', 'carousel', 'discountActions', 'carsInStoc', 'footer', 'navBar', 'header', 'form'].join(',', ',');

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
      console.log('responce', response);

      this.props.dispatch(getData(response.items, locale))
    })
    .catch(console.error)
  }

  returnSubPages = (params, homeData, locale) => {
    console.log('sub',locale);

    const subPagesMap = {
      home: () => this.renderHomePage(homeData, locale),
      pocetna: () => this.renderHomePage(homeData, locale),
      conditions: () => this.renderConditions(locale),
      uslovi: () => this.renderConditions(locale),
    }

    let key = params.page ? params.page : 'home';

    return subPagesMap[key]();

  }

  renderConditions = (locale) => {
    const {
      params,
    } = this.props;

    return <Conditions params={ params } locale={locale}/>
  }

  renderHomePage = (homeData, locale) => {
    console.log('home inside', locale);


    const body = documentToHtmlString(get(homeData[locale], 'aboutUs.aboutUs') || '');
    console.log(body);

    const id = get(homeData[locale], 'aboutUs.id')

    return (
      <Fragment>
        <Carousel images={ homeData[locale].carouselImages }/>
        <Container className='Home-mainText' id={ id }>
          <div dangerouslySetInnerHTML={ { __html: body } }></div>
        </Container>
        <Discount data={ homeData[locale].discount } />
        <Cars data={ homeData[locale].cars } />
      </Fragment>
    );
  }

  render() {
    const {
      homeData,
      breakpoint,
      match,
      match: {
        params: {
          language,
        }
      }
    } = this.props;

    const locale = locales[language] ? locales[language] : 'sr-Latn';
    const defLanguage = language ? language : 'sr';
    if(!homeData[locale].aboutUs) {
      return null;
    }

    return (
      <Fragment>
        <Header data={ homeData[locale].header }/>
        <NavBar
          data={ homeData[locale].navBar }
          breakpoint={ breakpoint }
          language={ defLanguage }
        />
        { this.returnSubPages(match.params, homeData, locale) }
        <Form data={ homeData[locale].form } locale={ locale } language={ defLanguage }/>
        <Footer data={ homeData[locale].footer } logo={ get(homeData[locale].header, 'logo.fields.file.url') }/>
      </Fragment>
    );
  }
}

export default connect((state) => ({
  homeData: get(state, 'home.data', []),
}))(withWindow(Home));