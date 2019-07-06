import React, { Component } from 'react';
import cx from 'classnames';

import './Column.scss';

export default class Column extends Component {
  static defaultProps = {
    className: '',
  };

  render() {
    const {
      children,
      className,
      sm,
      md,
      lg,
      xl,
      smOffset,
      mdOffset,
      lgOffset,
      xlOffset,
      ...rest
    } = this.props;

    const columnClasses = cx({
      Col: true,
      [className]: className,
      [`Col--sm-${ sm }`]: sm,
      [`Col--md-${ md }`]: md,
      [`Col--lg-${ lg }`]: lg,
      [`Col--xl-${ xl }`]: xl,
      [`Offset--sm-${ smOffset }`]: smOffset || smOffset === 0,
      [`Offset--md-${ mdOffset }`]: mdOffset || mdOffset === 0,
      [`Offset--lg-${ lgOffset }`]: lgOffset || lgOffset === 0,
      [`Offset--xl-${ xlOffset }`]: xlOffset || xlOffset === 0,
    });

    return (
      <div
        { ...rest }
        className={ columnClasses }
      >
        { children }
      </div>
    );
  }
}
