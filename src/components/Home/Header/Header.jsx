import React, { Component, Fragment } from 'react';
import Ratio from 'react-ratio';
import { Link } from 'react-router-dom';
import Container from '../../Global/Container/Container';
import Telephone from '../../../assets/telephone.svg';
import Whatsapp from '../../../assets/whatsapp.svg';
import Viber from '../../../assets/viber.svg';
import RsFlag from '../../../assets/rs-flag.svg';
import GrbFlag from '../../../assets/grb-flag.svg';
import Mail from '../../../assets/mail.svg';
import { routeCodes } from '../../../constants/routes';


import './Header.scss';
import { getRoute } from '../../../constants/routes';

class Header extends Component {
  renderContacts = (telephone, mail) => {
    const contactsMap = [
      {
        icon: Telephone,
        href: `mailto:${ mail }`,
      },
      {
        icon: Mail,
        href: `tel:${ telephone }`,
      },
      {
        icon: Viber,
        href: `viber://add?number=${ telephone }`,
      },
      {
        icon: Whatsapp,
        href: `https://api.whatsapp.com/send?phone=${ telephone }`,
      }
    ];

    return contactsMap.map((contact) => {
      const Icon = contact.icon

      return (
        <a
          href={ contact.href }
          key={ contact.href }
          rel='noopener noreferrer'
          target='_blank'
        >
          <Icon />
        </a>
      )
    })
  }

  handleLanguageChange = (event) => {
    console.log(event);

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
          <RsFlag />
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
          target='_blank'
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
    } = this.props;

    if (!data) {
      return null
    }

    const telephone = data.contact.replace(/\+/g, '');

    return (
      <div className='Header-wrapper'>
        <Container className='Header'>
        <div className='Header-logoContainer'>
            <Ratio
              ratio={ 744/265 }
            >
            <div
              className="Header-logo"
              style={ { backgroundImage: `url(${ data.logo.fields.file.url })` } }
            />
            </Ratio>
          </div>
          <div className='Header-mail'>
            <a
              href={ `mailto:${ data.mail }`}
              target="_self"
            >{ data.mail }</a>
          </div>
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

