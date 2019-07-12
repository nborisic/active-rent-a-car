import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Container from '../../Global/Container/Container';
import Grid from '../../Global/Grid/Grid';
import Col from '../../Global/Column/Column';
import { Form, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'
import DatePicker from 'react-datepicker';
import Whatsapp from '../../../assets/whatsapp.svg';
import Calendar from '../../../assets/calendar.svg';
import Time from '../../../assets/time.svg';
import * as emailjs from 'emailjs-com';
import { hasStringValue, hasEmailValue } from '../../../utils/helpers';

import 'react-datepicker/dist/react-datepicker.css';

import './Form.scss';

const labels = {
  ['en-US']: {
    title: 'Reservation',
    carsPlaceholder: 'Select a vehicle',
    pickUpLocationLabel: 'Pick up location',
    pickUpLocationPlaceholder: 'Select pick up location...',
    dropOffLocationLabel: 'Drop off location',
    dropOffLocationPlaceholder: 'Select drop off location...',
    pickUpDatePlaceholder: `Pick up date`,
    dropOffDatePlaceholder: 'Drop off date',
    pickUpTimePlaceholder: 'Pick up time',
    dropOffTimePlaceholder: 'Drop off time',
    namePlaceholder: 'Name',
    lastNamePlaceholder: 'Last name',
    telephonePlaceholder: 'Tel.(+381 65 111 222)',
    emailPlaceholder: 'E-mail',
    birthdayPlaceholder: 'Birthday',
    flightNumberPlaceholder: 'Flight number or Airline arrival',
    commentPlaceholder: 'Leave your comment...',
    conditions: 'I agree to ',
    timeCaption: 'Time',
    dateFormat: 'MM/dd/yyyy',
    rentalConditions: 'rental conditions',
    submitButton: 'Submit',
  },
  ['sr-Latn']: {
    title: 'Rezervacija',
    carsPlaceholder: 'Izaberi vozilo',
    pickUpLocationLabel: 'Mesto preuzimanja vozila',
    dropOffLocationLabel: 'Mesto vraćanja vozila',
    pickUpLocationPlaceholder: 'Izaberi Mesto preuzimanja vozila...',
    dropOffLocationPlaceholder: 'Izaberi mesto vraćanja vozila...',
    pickUpDatePlaceholder: 'Datum preuzimanja',
    dropOffDatePlaceholder: 'Datum vraćanja',
    pickUpTimePlaceholder: 'Vreme preuzimanja',
    dropOffTimePlaceholder: 'Vreme vraćanja',
    namePlaceholder: 'Ime',
    lastNamePlaceholder: 'Prezime',
    telephonePlaceholder: 'Tel.(+381 65 111 222)',
    emailPlaceholder: 'E-mail',
    birthdayPlaceholder: 'Datm rodjenja',
    flightNumberPlaceholder: 'Broj leta ili Airline dolaska',
    commentPlaceholder: 'Napišite Vaš komentar...',
    conditions: 'Slažem se sa ',
    timeCaption: 'Vreme',
    dateFormat: 'dd/MM/yyyy',
    rentalConditions: 'uslovima najma',
    submitButton: 'Pošalji'
  }
}

class Reservation extends Component {
  onSubmit = (formValues) => {
    console.log(formValues);
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

  renderAdditions = (additions) => {
    return (
      <FieldArray
        name='additions'
        component={ this.CheckboxGroup }
        options={ additions }
      />
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
                  {labels[locale][`${ dropdown.name }Label`] ? <Col md={ 6 }>{selectElement}</Col> : <Col>{ selectElement }</Col>}
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
    } = this.props;

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
          onSubmit={ this.onSubmit }
          mutators={ {
            ...arrayMutators
          } }
          render={
            ({ handleSubmit, form, submitting }) =>{
              return (
                <form onSubmit={ handleSubmit }>
                  <Grid>
                    <Col
                      className='Form-selectWrapper'
                      md={ 6 }
                    >
                      { this.renderDropdowns(dropdowns, locale, form.getState().values) }
                      <Grid className='Form-dates'>
                        { this.renderDatePickers(datePickers) }
                      </Grid>
                      { this.renderAdditions(additions) }
                    </Col>
                    <Col md={6}>
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
                                  { labels[locale].conditions }<Link>{ labels[locale].rentalConditions }</Link>
                                  </label>
                                </Fragment>
                              )}
                            }
                          </Field>
                        </Col>
                      </Grid>
                    </Col>
                  </Grid>
              <button
                type='submit'
                className='Form-submit'
                disabled={ !form.getState().valid || submitting }
              >
                { labels[locale].submitButton }
              </button>
            </form>)
            }
          }
        />
      </div>
    )
  }

  handleSubmit = (e, value) => {
    e.preventDefault();
    console.log(e, value);

    var templateParams = {
      name: 'Nikola',
      from_name: 'RADI JBGT'
  };

  // emailjs.send('gmail', 'template_csYppzJ4', templateParams, 'user_UaMduedrdHDA2YXykZVnM')
  //     .then(function(response) {
  //        console.log('SUCCESS!', response.status, response.text);
  //     }, function(error) {
  //        console.log('FAILED...', error);
  //     });

  emailjs.send('mailjet', 'template_csYppzJ4', templateParams, 'user_UaMduedrdHDA2YXykZVnM')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });

  }

  renderSelectOptions = (options) => {
    return options.map((option, index) => {
      return <option key={ `${ option }-${ index }` }>{ option }</option>
    })
  }

  render() {
    if (!this.props.data) {
      return null;
    }

    return(
      <Container>
        { this.renderForm() }
      </Container>
    )
  }
}

export default Reservation;

