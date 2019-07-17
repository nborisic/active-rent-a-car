import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const withRedirect = ComposedComponent => class RedirectDecorator extends Component {
  state = {
    push: false,
    redirectUrl: null,
    state: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      redirectUrl,
    } = this.state;
    // Disable redirect-loop by reseting "redirectUrl" after "<Redirect />" has been rendered.
    if (!prevState.redirectUrl && redirectUrl) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        push: false,
        redirectUrl: null,
        state: null,
      });
    }
  }

  redirectTo = (redirectUrl, push = false, state = null) => {
    console.log(redirectUrl, push, state);

    this.setState({
      push,
      redirectUrl,
      state,
    });
  }

  render() {
    const {
      push,
      redirectUrl,
      state,
    } = this.state;

    console.log('STATE', state);


    if (redirectUrl) {
      return (
        <Redirect
          push={ push }
          to={
            {
              pathname: redirectUrl,
              state,
            }
          }
        />
      );
    }

    return (
      <ComposedComponent
        { ...this.props }
        redirectTo={ this.redirectTo }
      />
    );
  }
};

export default withRedirect;
