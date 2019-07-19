import React, { Component } from 'react';

import './ErrorHandle.scss';
import Container from '../../components/Global/Container/Container';

const labelMap = {
  sr: {
    title: 'Nešto je pošlo po zlu! :(',
    string1: 'Probajte da ponovo',
    string2: 'učitate',
    string3: 'ponovo stranicu?'
  },
  en: {
    title: 'Something went wrong! :(',
    string1: 'Why don’t you',
    string2: 'reload',
    string3: 'the page and try again?'
  }
}

const languages = ['sr', 'en'];

export default class ErrorHandler extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    const {
      hasError,
    } = this.state;

    const {
      children
    } = this.props;

    const stringLanguage = window.location.pathname.substr(1,2)
    const language = languages.includes(stringLanguage) ? stringLanguage : 'sr';


    if (hasError) {
      return (
        <div className='ErrorHandler'>
          <Container>
            <h1 className='ErrorHandlerTitle'>
              { labelMap[language].title }
            </h1>
            <div className='ErrorHandlerText'>
            { labelMap[language].string1 }
              <button
                className='ErrorHandlerReload'
                onClick={ this.reloadPage }
              >
                { labelMap[language].string2 }
              </button>
              { labelMap[language].string3 }
            </div>
          </Container>
        </div>
      );
    }
    return children;
  }
}
