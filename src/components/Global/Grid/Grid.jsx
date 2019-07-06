import React, { Component } from 'react';
import cx from 'classnames';

import './Grid.scss';

export default class Grid extends Component {
  static defaultProps = {
    className: '',
  };

  render() {
    const {
      children,
      className,
      orientation,
    } = this.props;

    const gridClasses = cx({
      Grid: true,
      [className]: className,
      [`Grid--${ orientation }`]: orientation,
    });

    return (
      <div
        { ...this.props }
        className={ gridClasses }
      >
        { children }
      </div>
    );
  }
}
