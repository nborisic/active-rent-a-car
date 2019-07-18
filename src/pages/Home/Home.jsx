import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
const contentful = require('contentful');
import get from 'lodash/get';
import { withWindow } from 'react-window-decorators';
import { spaceId, accessToken, locales } from '../../constants/contentful';
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
import PriceList from '../PriceList/PriceList';
import { scrollToElement } from '../../utils/helpers';

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    const locale = props.match.params.language ? locales[props.match.params.language] : locales.sr;

    if(props.homeData && props.homeData[locale] && !props.homeData[locale].aboutUs) {
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

    // scroll to element when not on home page
    if(this.props.location.state) {
      setTimeout(() => {
        scrollToElement(this.props.location.state.scrollToId);
      }, 0);
    }

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
      this.props.dispatch(getData(response.items, locale))
    })
    .catch(console.error)
  }

  returnSubPages = (params, homeData, locale) => {
    const subPagesMap = {
      home: () => this.renderHomePage(homeData, locale),
      pocetna: () => this.renderHomePage(homeData, locale),
      conditions: () => this.renderConditions(locale),
      uslovi: () => this.renderConditions(locale),
      cena: () => this.renderPrices(locale),
      price: () => this.renderPrices(locale),
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

  renderPrices = (locale) => {
    const {
      params,
    } = this.props;

    return <PriceList params={ params } locale={locale}/>
  }

  renderHomePage = (homeData, locale) => {

    const body = documentToHtmlString(get(homeData[locale], 'aboutUs.aboutUs') || '');

    const id = get(homeData[locale], 'aboutUs.id')

    return (
      <Fragment>
        <Carousel images={ homeData[locale].carouselImages }/>
        <Container className='Home-mainText' id={ id }>
          <div dangerouslySetInnerHTML={ { __html: body } } ></div>
        </Container>
        <Discount data={ homeData[locale].discount } locale={ locale }/>
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

    if(!homeData[locale].aboutUs) {
      return null;
    }

    const defLanguage = language ? language : 'sr';

    return (
      <Fragment>
        <Header data={ homeData[locale].header } language={ language }/>
        <NavBar
          data={ homeData[locale].navBar }
          breakpoint={ breakpoint }
          language={ defLanguage }
          match={ match }
        />
        { this.returnSubPages(match.params, homeData, locale) }
        <Form data={ homeData[locale].form } locale={ locale } language={ defLanguage }/>
        <Footer
          data={ homeData[locale].footer }
          logo={ get(homeData[locale].header, 'logo.fields.file.url') }
          locale={ locale }
        />
      </Fragment>
    );
  }
}

export default connect((state) => ({
  homeData: get(state, 'home.data', []),
}))(withWindow(Home));
