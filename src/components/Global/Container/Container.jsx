import React, { Component } from 'react';
import cx from 'classnames';

import './Container.scss';

export default class Container extends Component {
  static defaultProps = {
    className: '',
  };

  render() {
    const {
      children,
      className,
      ...rest
    } = this.props;

    const containerClasses = cx('Container', {
      [className]: className,
    });

    return (
      <div
        {...rest}
        className={ containerClasses }
      >
        { children }
      </div>
    );
  }
}
