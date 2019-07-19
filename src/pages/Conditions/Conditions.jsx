import React, { Component, Fragment } from 'react';
const contentful = require('contentful');
import get from 'lodash/get';
import { connect } from 'react-redux';
import { getConditionsData } from '../../reducers/conditions';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import Container from '../../components/Global/Container/Container';
import { getContentfulData } from '../../utils/helpers';

import './Conditions.scss';

const entriesToGet = ['termsAndContitions'].join(',', ',');

class Conditions extends Component {
  constructor(props) {
    super(props)

    const {
      locale,
      dispatch,
    } = props;

    scrollTo(0,0);

    if(props.conditionsData && props.conditionsData[locale] && !props.conditionsData[locale].conditions) {
      getContentfulData(locale, entriesToGet, getConditionsData, dispatch);
    }
  }

  render() {
    const {
      conditionsData,
      locale,
    } = this.props;

    if(!conditionsData[locale].conditions) {
      return null;
    }

    const body = documentToHtmlString(get(conditionsData[locale], 'conditions') || '');

    return(
      <Container className='Conditions'>
          <div dangerouslySetInnerHTML={ { __html: body } }></div>
      </Container>
    )
  }
}

export default connect((state) => ({
  conditionsData: get(state, 'conditions.data', []),
}))(Conditions);

