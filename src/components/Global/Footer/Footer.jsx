import React, { Component, Fragment } from 'react';
import Ratio from 'react-ratio';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
// import div from '../../Global/divumn/divumn';

import './Footer.scss';

class Footer extends Component {
  render() {
    const {
      data,
      logo,
    } = this.props;

    const priceListLabel = 'Price list';
    const rentalConditionsLabel = 'Rental conditions';
    const addressLabel = 'Address';
    const workingHoursLabel = 'Working hours';
    const contactLabel = 'Contact';
    const followUsLabel = 'Follow us';

    return(
      <div className='Footer-wrapper'>
        <Container className='Footer-container'>
          <div className='Footer-items'>
            <div className='Footer-logoContainer'>
              <Ratio
                ratio={ 744/265 }
              >
              <div
                className="Header-logo"
                style={ { backgroundImage: `url(${ logo })` } }
              />
              </Ratio>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ priceListLabel }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ rentalConditionsLabel }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ addressLabel }</div>
              <div>{ data.address }</div>
              <div>{ data.zipCode }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ workingHoursLabel }</div>
              <div>{ data.workingHours }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ contactLabel }</div>
              <div>{ data.contact }</div>
              <div>{ data.email }</div>
            </div>
            <div
              className='Footer-item'
            >
              <div className='Footer-title'>{ followUsLabel }</div>
              <div>
              <a
                href={ data.facebookLink }
                rel='noopener noreferrer'
                target='_blank'
              >
                Facebook
              </a>
              </div>
              <div>
              <a
                href={ data.instagramLink }
                rel='noopener noreferrer'
                target='_blank'
              >
                Instagram
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

