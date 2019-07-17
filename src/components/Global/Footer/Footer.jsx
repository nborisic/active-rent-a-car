import React, { Component, Fragment } from 'react';
import Ratio from 'react-ratio';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
import Instagram from '../../../assets/instagram.svg';
import Facebook from '../../../assets/facebook.svg';

import './Footer.scss';

class Footer extends Component {
  render() {
    const {
      data,
      logo,
      locale,
    } = this.props;

    const labelMap = {
      ['en-US']: {
        priceListLabel: 'Price list',
        rentalConditionsLabel: 'Rental conditions',
        addressLabel: 'Address',
        workingHoursLabel: 'Working hours',
        contactLabel: 'Contact',
        followUsLabel: 'Follow us',
      },
      ['sr-Latn']: {
        priceListLabel: 'Cenovnik',
        rentalConditionsLabel: 'Uslovi najma',
        addressLabel: 'Adresa',
        workingHoursLabel: 'Radno vreme',
        contactLabel: 'Kontakt',
        followUsLabel: 'Pratite nas',
      }
    }

    return(
      <div className='Footer-wrapper' id={ data.id }>
        <Container className='Footer-container'>
          <div className='Footer-items'>
            <div className='Footer-logoContainer'>
              <Ratio
                ratio={ 1487/379 }
              >
              <div
                className="Header-logo"
                style={ { backgroundImage: `url(${ logo })` } }
              />
              </Ratio>
            </div>
            {/* <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ labelMap[locale].priceListLabel }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ labelMap[locale].rentalConditionsLabel }</div>
            </div> */}
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ labelMap[locale].addressLabel }</div>
              <div>{ data.address }</div>
              <div>{ data.zipCode }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ labelMap[locale].workingHoursLabel }</div>
              <div>{ data.workingHours }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ labelMap[locale].contactLabel }</div>
              <div>{ data.contact }</div>
              <div>{ data.email }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ labelMap[locale].followUsLabel }</div>
              <div className='Footer-iconsContainer'>
                <a
                  className='Footer-icon'
                  href={ data.facebookLink }
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <Facebook />
                </a>
                <a
                  className='Footer-icon'
                  href={ data.instagramLink }
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <Instagram />
                </a>
              </div>
            </div>

          </div>
        </Container>
      </div>
    )
  }
}


export default Footer;

