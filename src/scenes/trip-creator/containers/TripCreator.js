import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from 'semantic-ui-react';
import actions from 'store/search/actions';
import axios from 'libs/axios';
import BrandFooter from 'shared_components/BrandFooter';
import history from 'main/history';
import headerActions from 'store/header/actions';
import analytics from 'libs/analytics';
import * as sessionActions from 'store/session/actions';

const PageContent = styled.div`
  margin: 0 20px auto;
`;

class TripCreatorContainer extends Component {
  componentDidMount() {
    this.createTrip = () => {
      analytics.trip.create();
      this.creatingTrip = true;
      axios
        .post(`/trips`, {
          totalPrice: 0,
          duration: 1,
          media: [],
          services: [],
          title: { 'en-us': 'My Trip' },
        })
        .then(response => {
          this.props.changeUserTrip(response.data);
          history.replace(`/trips/organize/${response.data._id}`);
        });
    };
    if (this.props.session._id) {
      this.createTrip();
    }
    this.props.changeHeader();
  }

  componentDidUpdate() {
    if (this.props.session._id && !this.creatingTrip) {
      this.createTrip();
    }
  }
  render() {
    return (
      <React.Fragment>
        <PageContent>
          <Loader inline="centered" active size="massive" />
        </PageContent>
        <BrandFooter withTopBorder withPadding />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session.session,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeDates: actions.patchSearchQuery,
      changeHeader: headerActions.changeHeader,
      changeUserTrip: sessionActions.changeCurrentUserTrip,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(TripCreatorContainer));
