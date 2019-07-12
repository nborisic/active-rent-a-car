import React, { Component, Fragment } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import Container from '../../Global/Container/Container';
import slugify from '../../../utils/helpers';
import { slide as Menu } from 'react-burger-menu';
import { HamburgerButton } from 'react-hamburger-button';
import { scrollToElement } from '../../../utils/helpers';
import { getRoute, routeCodes } from '../../../constants/routes';


class NavBar extends Component {
  state = {
    isBurgerOpen: false,
  }

  renderNavBars = () => {
    const {
      data,
      language,
    } = this.props;

    return data.map((item) => {
      if (item.params) {
        return (
          <Link
            key={ item.label }
            to={ getRoute(routeCodes.HOME, { language, ...item.params }) }
          >
            { item.label }
          </Link>
        );
      } else {
        return (
          <div
            onClick={() => scrollToElement(item.id) }
            key={ item.label }
            className='NavBar-item'
          >
            { item.label }
          </div>
        );
      }
    })
  }

  closeBurger = (state) => {
    if(!state.isOpen) {
      this.setState({
        isBurgerOpen: false,
      });
    }

  }

  openBurger = () => {
    this.setState({
      isBurgerOpen: true,
    });
  }

  render() {
    const {
      breakpoint,
    } = this.props;

    const {
      isBurgerOpen,
    } = this.state;

    const isMdBreakpoint = breakpoint === 'sm';

    return (
      <div className='NavBar-container'>
        { isMdBreakpoint ?
          <Fragment>
            <Menu left isOpen={ isBurgerOpen } width={ '45%' } onStateChange={ this.closeBurger } >
              { this.renderNavBars() }
            </Menu>
            <div className='NavBar-hamburgerButton'>
              <HamburgerButton
                open={ isBurgerOpen }
                onClick={ this.openBurger }
                width={36}
                height={30}
                strokeWidth={5}
                left={20}
                color='black'
                animationDuration={0.3}
              />
            </div>
        </Fragment> :
        <Container >
          <div className='NavBar'>{ this.renderNavBars() }</div>
        </Container> }
      </div>
    );
  }
}


export default NavBar;

