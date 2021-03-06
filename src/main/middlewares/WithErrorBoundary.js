import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';
import ErrorPage from 'shared_components/ErrorPage';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ErrorBoundary extends Component {
    state = {
      showErrorPage: false,
    };

    componentDidCatch(error, info) {
      this.setState({ showErrorPage: true });
      console.log({ error, info });

      Sentry.configureScope(scope => {
        scope.setExtra('info', info);
        scope.setExtra('wasHandledByComponent', false);
        if (this.props.session.username) {
          scope.setUser({ username: this.props.session.username });
        } else {
          scope.setUser(null);
        }
      });

      Sentry.captureException(error);
    }

    render() {
      if (this.state.showErrorPage) {
        return <ErrorPage />;
      }
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    session: state.session.session,
  });

  return connect(mapStateToProps)(ErrorBoundary);
};
