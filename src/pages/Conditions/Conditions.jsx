import React, { Component, Fragment } from 'react';
const contentful = require('contentful');
import get from 'lodash/get';
import { connect } from 'react-redux';
import { spaceId, accessToken, locales } from '../../constants/contentful';
import { getConditionsData } from '../../reducers/conditions';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Container from '../../components/Global/Container/Container';
// import Grid from '../../Global/Grid/Grid';
// import Col from '../../Global/Column/Column';
// import Ratio from 'react-ratio';

import './Conditions.scss';

class Conditions extends Component {
  componentDidMount() {
    const {
      locale,
    } = this.props;


    scrollTo(0,0);
    console.log('MOUNTOVALA S');


      this.getContentfulData(locale)

  }

  getContentfulData = (locale) => {
    const entriesToGet = ['termsAndContitions'].join(',', ',');

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
      this.props.dispatch(getConditionsData(response.items, locale))
    })
    .catch(console.error)
  }

  render() {
    const {
      conditionsData,
      locale,
    } = this.props;

    const body = documentToHtmlString(get(conditionsData[locale], 'conditions') || '');

    return(
      <Container>
          <div dangerouslySetInnerHTML={ { __html: body } }></div>
      </Container>
    )
  }
}

export default connect((state) => ({
  conditionsData: get(state, 'conditions.data', []),
}))(Conditions);

