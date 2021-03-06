import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import get from 'lodash/get';
import { locales } from '../../constants/contentful';
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
import { scrollToElement, getContentfulData } from '../../utils/helpers';
import MetaData from '../../components/Global/MetaData/MetaData';
import ReactGA from 'react-ga';


const entriesToGet = ['aboutUs', 'sliderImages', 'discountActions', 'carsInStoc', 'footer', 'navBar', 'header', 'form'].join(',', ',');

import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    ReactGA.initialize(process.env.GA_ID.toString());
    props.history.listen((location, action) => {
        ReactGA.pageview(location.pathname + location.search);
    });

    const locale = props.match.params.language ? locales[props.match.params.language] : locales.sr;

    if(props.homeData && props.homeData[locale] && !props.homeData[locale].aboutUs) {
      getContentfulData(locale, entriesToGet, getData, props.dispatch)
    }
  }


  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {
          language,
        }
      },
      dispatch
    } = this.props;

    // scroll to element when not on home page
    if(this.props.location.state) {
      setTimeout(() => {
        scrollToElement(this.props.location.state.scrollToId);
      }, 0);
    }

    const locale = language ? locales[language] : locales.sr;

    if (prevProps.match.params.language !== language && !this.props.homeData[locale].aboutUs) {
      getContentfulData(locale, entriesToGet, getData, dispatch)
    }
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
        <Carousel images={ homeData[locale].sliderImages }/>
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
        <MetaData language={ defLanguage }/>
        <Header data={ homeData[locale].header } language={ language }/>
        <NavBar
          data={ homeData[locale].navBar }
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
}))(Home);
