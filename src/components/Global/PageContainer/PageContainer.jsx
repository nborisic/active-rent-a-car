import React, { Component } from 'react';
import cx from 'classnames';

import Container from '../Container/Container';
import './PageContainer.scss';

export default class PageContainer extends Component {
  static defaultProps = {
    className: '',
    noTopPadding: false,
    noBottomPadding: false,
  };

  render() {
    const {
      children,
      noTopPadding,
      noBottomPadding,
      className,
      ...rest
    } = this.props;

    const containerClasses = cx({
      'PageContainer': true,
      'PageContainer-noTopPadding': noTopPadding,
      'PageContainer-noBottomPadding': noBottomPadding,
      [className]: className,
    });

    return (
      <Container
        {...rest}
        className={ containerClasses }
      >
        { children }
      </Container>
    );
  }
}
