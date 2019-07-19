import React, { Component, Fragment } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import Container from '../../Global/Container/Container';
import slugify from '../../../utils/helpers';
import { slide as Menu } from 'react-burger-menu';
import { HamburgerButton } from 'react-hamburger-button';
import { scrollToElement } from '../../../utils/helpers';
import { getRoute, routeCodes } from '../../../constants/routes';
import withRedirect from '../../../decorators/redirect';
import animateScrollTo from 'animated-scroll-to';

class NavBar extends Component {
  state = {
    isBurgerOpen: false,
  }

  renderNavBars = () => {
    const {
      data,
      language,
      match,
    } = this.props;

    const homeParams = ['pocetna', 'home'];
    const homeIds = ['aboutUs', 'vehicles'];
    const needsToRedirectPages = ['conditions', 'uslovi', 'price', 'cena'];

    const isRedirectedPage = needsToRedirectPages.indexOf(match.params.page) !== -1;

    return data.map((item) => {
      const isRedirectLink = homeIds.indexOf(item.id) !== -1;

      if (item.params) {
        if((!match.params.page || homeParams.indexOf(match.params.page) !== -1) && homeParams.indexOf(item.params.page) !== -1) {
          return (
            <div
            onClick={() => animateScrollTo(0)}
            key={ item.label }
            className='NavBar-item'
            >
              { item.label }
            </div>
          )
        }

        return (
          <Link
            onClick={ this.closeBurger }
            key={ item.label }
            to={ getRoute(routeCodes.HOME, { language, ...item.params }) }
          >
            { item.label }
          </Link>
        );
      } else {
        return (
          <div
            onClick={() => (isRedirectedPage && isRedirectLink) ? this.handelRedirect(item.id) : this.handleInnerScroll(item.id) }
            key={ item.label }
            className='NavBar-item'
          >
            { item.label }
          </div>
        );
      }
    })
  }

  handelRedirect = (itemId) => {
    const {
      redirectTo,
      language,
    } = this.props;

    redirectTo(getRoute(routeCodes.HOME, { language, page: 'home' }), true, { scrollToId: itemId })
  }

  forceCloseBurger = () => {
    this.setState({
      isBurgerOpen: false,
    });
  }

  handleInnerScroll = (itemId) => {
    this.forceCloseBurger();

    console.log(itemId);


    scrollToElement(itemId);
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
      isBurgerOpen,
    } = this.state;


    return (
      <div className='NavBar-container'>
        <div className='NavBar-wrapper'>
          <Menu left isOpen={ isBurgerOpen } width={ '45%' } onStateChange={ this.closeBurger } >
            { this.renderNavBars() }
          </Menu>
          <div className='NavBar-hamburgerButton'>
            <HamburgerButton
              open={ isBurgerOpen }
              onClick={ this.openBurger }
              width={30}
              height={20}
              strokeWidth={4}
              left={20}
              color='black'
              animationDuration={0.3}
            />
          </div>
        </div>
        <Container className='NavBar-wrapper--sm'>
          <div className='NavBar'>{ this.renderNavBars() }</div>
        </Container>
      </div>
    );
  }
}


export default withRedirect(NavBar);

