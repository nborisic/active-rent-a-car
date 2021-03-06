import React, { Component, Fragment } from 'react';
import Ratio from 'react-ratio';
import { Link } from 'react-router-dom';
import Container from '../../Global/Container/Container';
import Telephone from '../../../assets/telephone.svg';
import Whatsapp from '../../../assets/whatsapp.svg';
import Viber from '../../../assets/viber.svg';
import GrbFlag from '../../../assets/grb-flag.svg';
import Mail from '../../../assets/mail.svg';
import { routeCodes } from '../../../constants/routes';
import rsFlag from '../../../assets/rs-flag.png';


import './Header.scss';
import { getRoute } from '../../../constants/routes';

class Header extends Component {
  renderContacts = (telephone, mail) => {
    const contactsMap = [
      {
        icon: Telephone,
        href: `tel:${ telephone }`,
        target: '_self'
      },
      {
        icon: Mail,
        href: `mailto:${ mail }`,
        target: '_self'
      },
      {
        icon: Viber,
        href: `viber://chat?number=%2B${ telephone }`,
        target: '_blank'
      },
      {
        icon: Whatsapp,
        href: `https://api.whatsapp.com/send?phone=${ telephone }`,
        target: '_blank'
      }
    ];

    return contactsMap.map((contact) => {
      const Icon = contact.icon

      return (
        <a
          href={ contact.href }
          key={ contact.href }
          rel='noopener noreferrer'
          target={ contact.target }
        >
          <Icon />
        </a>
      )
    })
  }

  renderFlags = () => {
    return (
      <Fragment>
        <Link
          to={ getRoute(routeCodes.HOME, { language: 'en' }) }
          className='Header-flag'
          type='button'
        >
          <GrbFlag />
        </Link>
        <Link
          to={ getRoute(routeCodes.HOME, { language: 'sr' }) }
          className='Header-flag'
          type='button'
        >
          <div
            style={ { backgroundImage: `url(${ rsFlag })` } }
          />
        </Link>
      </Fragment>
    );
  }

  renderContact = (localNumber, telephone,) => {
    return (
      <Fragment>
        <a
          href={ `tel:${ telephone }` }
          rel='noopener noreferrer'
          target='_self'
        >
          <Telephone />
        </a>
        <div>{ localNumber }</div>
      </Fragment>
    )
  }

  render() {
    const {
      data,
      language,
    } = this.props;

    if (!data) {
      return null
    }

    const telephone = data.contact.replace(/[\+\s]/g, '');

    return (
      <div className='Header-wrapper' id='home'>
        <Container className='Header'>
          <Link to={ getRoute(routeCodes.HOME, { language, page: '' }) } className='Header-logoContainer'>
            <Ratio
              ratio={ 1487/379 }
            >
            <div
              className='Header-logo'
              style={ { backgroundImage: `url(${ data.logo.fields.file.url })` } }
            />
            </Ratio>
          </Link>
          <div className='Header-contactContainer'>
            <div className='Header-flagContainer'>{ this.renderFlags() }</div>
            <div className='Header-contactWrapper'>
              { this.renderContact(data.contact, telephone) }
            </div>
            <div className='Header-iconsContainer'>
              { this.renderContacts(telephone, data.mail) }
            </div>
          </div>
        </Container>
      </div>
    )
  }
}


export default Header;

