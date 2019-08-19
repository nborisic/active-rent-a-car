import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
import Col from '../../Global/Column/Column';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import DatePicker from 'react-datepicker';
import Calendar from '../../../assets/calendar.svg';
import Time from '../../../assets/time.svg';
import * as emailjs from 'emailjs-com';
import { hasStringValue, hasEmailValue } from '../../../utils/helpers';
import CheckMark from '../../../assets/check-mark.svg';
import Error from '../../../assets/error.svg';
import Spinner from '../../Global/Spinner/Spinner';

import 'react-datepicker/dist/react-datepicker.css';

import './Form.scss';
import { getRoute, routeCodes } from '../../../constants/routes';

const labels = {
  ['en-US']: {
    title: 'Reservation',
    carsPlaceholder: 'Select a vehicle',
    pickUpLocationLabel: 'Pick up location',
    pickUpLocationPlaceholder: 'Pick up',
    dropOffLocationLabel: 'Drop off location',
    dropOffLocationPlaceholder: 'Drop off',
    pickUpDatePlaceholder: `Pick up date`,
    dropOffDatePlaceholder: 'Drop off date',
    pickUpTimePlaceholder: 'Pick up time',
    dropOffTimePlaceholder: 'Drop off time',
    namePlaceholder: 'Name*',
    lastNamePlaceholder: 'Last name*',
    telephonePlaceholder: 'Tel.(+381 65 111 222)*',
    emailPlaceholder: 'E-mail*',
    birthdayPlaceholder: 'Birthday*',
    flightNumberPlaceholder: 'Flight number',
    commentPlaceholder: 'Leave your comment...',
    conditions: 'I agree to ',
    timeCaption: 'Time',
    dateFormat: 'MM/dd/yyyy',
    rentalConditions: 'rental conditions',
    submitButton: 'Submit',
    accessories: 'Accessories',
    requiredLabel: '* required fields',
    formMessage: {
      success: 'Reservation sent successfully!',
      error: 'Something went wrong. Try again later...'
    }
  },
  ['sr-Latn']: {
    title: 'Rezervacija',
    carsPlaceholder: 'Izaberi vozilo',
    pickUpLocationLabel: 'Mesto preuzimanja vozila',
    dropOffLocationLabel: 'Mesto vraćanja vozila',
    pickUpLocationPlaceholder: 'Mesto preuzimanja',
    dropOffLocationPlaceholder: 'Mesto vraćanja',
    pickUpDatePlaceholder: 'Datum preuzimanja',
    dropOffDatePlaceholder: 'Datum vraćanja',
    pickUpTimePlaceholder: 'Vreme preuzimanja',
    dropOffTimePlaceholder: 'Vreme vraćanja',
    namePlaceholder: 'Ime*',
    lastNamePlaceholder: 'Prezime*',
    telephonePlaceholder: 'Tel.(+381 65 111 222)*',
    emailPlaceholder: 'E-mail*',
    birthdayPlaceholder: 'Datum rođenja*',
    flightNumberPlaceholder: 'Broj leta',
    commentPlaceholder: 'Napišite Vaš komentar...',
    conditions: 'Slažem se sa ',
    timeCaption: 'Vreme',
    dateFormat: 'dd/MM/yyyy',
    rentalConditions: 'Uslovima najma',
    submitButton: 'Pošalji',
    accessories: 'Dodaci',
    requiredLabel: '* obavezna polja',
    formMessage: {
      success: 'Rezervacija je uspešno poslata!',
      error: 'Nesto je pošlo po zlu, probajte opet...'
    }
  }
}

class Reservation extends Component {
  state = {
    formSent: false,
    formSuccess: false,
    submitting: false,
    reservedCar: null,
  }

  CheckboxGroup = ({ fields, options }) => {
    const toggle = (event, option) => {
      if (event.target.checked) {
        fields.push(option);
      } else {
        fields.remove(option);
      }
    };

    return (
      <div style={{ color: 'blue' }}>
        { options.map(option => (
          <div key={option}>
            <input
              type='checkbox'
              onClick={event => toggle(event, option)}
              name={ option }
              id={ option }
            />
            <label htmlFor={ option }>{ option }</label>
          </div>
        ))}
      </div>
    );
  };

  renderAdditions = (additions, locale) => {
    return (
      <Fragment>
        <span className='Form-accessories' >{ labels[locale].accessories }</span>
        <FieldArray
          name='additions'
          component={ this.CheckboxGroup }
          options={ additions }
        />
      </Fragment>
    )
  }

  renderDropdowns = (dropdowns, locale, values) => {
    return dropdowns.map((dropdown) => {
      const datePickerClassName = cx('Form-select Form-input',{
        'Form-select--hasValue': Boolean(values[dropdown.name]),
      })
      return (
        <Field
          key={ dropdown.name }
          name={ dropdown.name }
        >
          {({ input }) => {
            const selectElement = (
              <select className={ datePickerClassName } { ...input }>
                {
                  labels[locale][`${ dropdown.name }Placeholder`] &&
                  <option value='' disabled hidden>{ labels[locale][`${ dropdown.name }Placeholder`] }</option>
                }
                { this.renderSelectOptions(dropdown.options) }
                </select>
            )

            return (
              <div className='Form-inputContainer'>
                <Grid>
                  {
                    labels[locale][`${ dropdown.name }Label`] &&
                    <Col md={ 6 }>
                      <label htmlFor={ dropdown.name }>{ labels[locale][`${ dropdown.name }Label`] }</label>
                    </Col>
                  }
                  { labels[locale][`${ dropdown.name }Label`] ? <Col md={ 6 }>{ selectElement }</Col> : <Col>{ selectElement }</Col>}
                </Grid>
              </div>
            )
          }}
        </Field>
      );
    })
  }

  renderDatePickers = (datePickers) => {
    return datePickers.map(picker => {
      return (
        <Col
          key={ picker.name }
          md={ 6 }
        >
          <Field
            name={ picker.name }
          >
          {({input}) => {
            return (
              <div>
                <DatePicker
                  className='Form-date Form-input'
                  { ...input }
                  selected={input.value}
                  { ...picker.props }
                />
                { picker.type === 'date' ? <Calendar /> : <Time /> }
              </div>
            )
          }}
          </Field>
        </Col>
      );
    });
  }

  getProps = (type, name, locale) => {
    const types = {
      date: {
        minDate: new Date(),
        placeholderText: labels[locale][`${ name }Placeholder`],
        dateFormat: labels[locale].dateFormat,
      },
      time : {
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 15,
        dateFormat: 'HH:mm',
        timeFormat: 'HH:mm',
        placeholderText: labels[locale][`${ name }Placeholder`],
        timeCaption: labels[locale].timeCaption,
      }
    }

    return types[type];
  }

  renderInputs = (inputs, locale) => {
    return inputs.map(input => {
      const Tag = input.type;
      return (
        <Col
          key={ input.name }
          md={ input.type === 'textarea' ? 12 : 6 }
        >
          <Field
            name={ input.name }
            validate={ (value) => {
              if(!input.validate) {
                return null;
              }

              return input.validate(value) ? null : 'error';
            } }
          >
          {({ input, meta }) => {
            const inputClassName = cx('Form-input',{
              'Form-input--hasError': meta.error && meta.touched,
            });

            return (
              <Tag
                { ...input }
                className={ inputClassName }
                type='text'
                placeholder={ labels[locale][`${ input.name }Placeholder`]
              }/>
            );
          }}
          </Field>
        </Col>
      )
    })
  }

  renderForm = () => {
    const {
      data: {
        carsToReserve,
        dropOffLocation,
        pickUpLocation,
        additions,
      },
      locale,
      language,
    } = this.props;

    const {
      formSent,
      submitting,
      formSuccess,
    } = this.state;

    const conditionsLink = language === 'sr' ? 'uslovi' : 'conditions';

    const dropdowns = [
      {
        name: 'cars',
        options: carsToReserve,
      },
      {
        name: 'pickUpLocation',
        options: pickUpLocation,
      },
      {
        name: 'dropOffLocation',
        options: dropOffLocation,
      },
    ];

    const datePickers = [
      {
        name: 'pickUpDate',
        type: 'date',
        props: this.getProps('date', 'pickUpDate', locale),
      },
      {
        name: 'pickUpTime',
        type: 'time',
        props: this.getProps('time', 'pickUpTime', locale),
      },
      {
        name: 'dropOffDate',
        type: 'date',
        props: this.getProps('date', 'dropOffDate', locale),
      },
      {
        name: 'dropOffTime',
        type: 'time',
        props: this.getProps('time', 'dropOffTime', locale),
      }
    ];

    const inputs = [
      {
        name: 'name',
        validate: hasStringValue,
        type: 'input'
      },
      {
        name: 'lastName',
        validate: hasStringValue,
        type: 'input'
      },
      {
        name: 'telephone',
        validate: hasStringValue,
        type: 'input'
      },
      {
        name: 'email',
        validate: hasEmailValue,
        type: 'input'
      },
      {
        name: 'birthday',
        validate: hasStringValue,
        type: 'input'
      },
      {
        name: 'flightNumber',
        type: 'input'
      },
      {
        name: 'comment',
        type: 'textarea'
      },
    ]

    return (
      <div className='Form'>
        <h2 className='Form-title'>{ labels[locale].title }</h2>
        <Form
          onSubmit={ this.handleSubmit }
          initialValues={ { cars: this.props.reservationData[locale].reservedClass } }
          mutators={ {
            ...arrayMutators
          } }
          render={
            ({ handleSubmit, form }) =>{
              return (
                <form onSubmit={ handleSubmit } autoComplete="off">
                  <Grid className='Form-container'>
                    <Col
                      className='Form-selectWrapper'
                      md={ 6 }
                    >
                      { this.renderDropdowns(dropdowns, locale, form.getState().values) }
                      <Grid className='Form-dates'>
                        { this.renderDatePickers(datePickers) }
                      </Grid>
                      { this.renderAdditions(additions, locale) }
                    </Col>
                    <Col md={6} className='Form-contactWrapper'>
                      <Grid className='Form-contact'>
                        { this.renderInputs(inputs, locale) }
                        <Col>
                          <Field
                            name='conditions'
                            type='checkbox'
                            validate={ (value) => {
                              return value ? null : 'error'
                            } }
                          >
                            {({input}) => {
                              return (
                                <Fragment>
                                  <input
                                    {...input}
                                    type='checkbox'
                                    name='conditions'
                                    id='conditions'
                                  />
                                  <label
                                    htmlFor='conditions'
                                    className='Form-conditions'
                                  >
                                  { labels[locale].conditions }<Link
                                  to={ getRoute(routeCodes.HOME, { language, page: conditionsLink }) }
                                  className='Form-conditionsLink'
                                  >{ labels[locale].rentalConditions }*</Link>
                                  </label>
                                </Fragment>
                              )}
                            }
                          </Field>
                        </Col>
                      </Grid>
                      <div className='Form-required'>{ labels[locale].requiredLabel }</div>
                    </Col>
                  </Grid>
                  <div className='Form-submitButton'>
                    <button
                      type='submit'
                      className='Form-bookButton'
                      disabled={ !form.getState().valid || submitting || formSent }
                    >
                     { submitting ? <Spinner /> : labels[locale].submitButton }
                    </button>
                    { formSent && <div className='Form-submitMessage'>{ formSuccess ?
                        <Fragment> <CheckMark /> <span>{labels[locale].formMessage.success}</span></Fragment> :
                        <Fragment> <Error /> <span>{ labels[locale].formMessage.error }</span></Fragment>
                      } </div> }
                  </div>
            </form>)
            }
          }
        />
      </div>
    )
  }

  handleSubmit = (value, e) => {
    this.setState({
      submitting: true,
    });

    var templateParams = {
      additions: value.additions ? value.additions.join(',', ', ') : '/',
      birthday: value.birthday,
      cars: value.cars ? value.cars : '/',
      comment: value.comment ? value.comment : '/',
      dropOffDate: value.dropOffDate ? new Date(value.dropOffDate).toLocaleDateString('sr-Latn-CS'): '/',
      dropOffLocation: value.dropOffLocation ? value.dropOffLocation : '/',
      dropOffTime: value.dropOffTime ? new Date(value.dropOffTime).toLocaleTimeString('sr-Latn-CS'): '/',
      email: value.email,
      flightNumber: value.flightNumber ? value.flightNumber : '/',
      lastName: value.lastName,
      name: value.name,
      pickUpDate: value.pickUpDate ? new Date(value.pickUpDate).toLocaleDateString('sr-Latn-CS') : '/',
      pickUpLocation: value.pickUpLocation ? value.pickUpLocation : '/',
      pickUpTime: value.pickUpTime?  new Date(value.pickUpTime).toLocaleTimeString('sr-Latn-CS') : '/',
      telephone: value.telephone ? value.telephone : '/',
  };

  const that = this;

  emailjs.send('gmail', 'template_csYppzJ4', templateParams, 'user_UaMduedrdHDA2YXykZVnM').then(function() {
    that.setState({
        formSent: true,
        submitting: false,
        formSuccess: true,
      })
    }, function(error) {
      that.setState({
        formSent: true,
        submitting: false,
      })
    });
  }

  renderSelectOptions = (options) => {
    return options.map((option, index) => {
      return <option key={ `${ option }-${ index }` }>{ option }</option>
    })
  }

  render() {
    return(
      <Container id={ this.props.data.id }>
        { this.renderForm() }
      </Container>
    )
  }
}

export default connect((state) => ({
  reservationData: get(state, 'reservedClass.data', []),
}))(Reservation);

