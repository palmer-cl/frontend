import React, { Component } from 'react';
import HomeComponent from './../components/Home';
import Helmet from 'react-helmet-async';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { websiteUrl } from 'libs/config';
import api from 'libs/apiClient';
import fetchHelperFactory, { defaultState } from 'libs/fetchHelper';
import headerActions from 'store/header/actions';

class HomeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: defaultState,
    };

    this.fetchTrips = fetchHelperFactory(this.setState.bind(this), 'trips', api.trips.featured.get);
  }

  componentDidMount() {
    this.fetchTrips({ include: ['owner', 'tags'] });
    this.props.changeHeader({ noSearch: true }); // not transparent?
  }

  getTrips = () => {
    this.setState(
      {
        trip: defaultState,
      },
      () => this.fetchTrips({ include: ['owner', 'tags'] }),
    );
  };

  render() {
    return (
      <div className="HomeContainer">
        <Helmet>
          <title>Deens, plan my trip!</title>
          <link rel="canonical" href={websiteUrl} />
        </Helmet>
        <HomeComponent
          trips={this.state.trips.data}
          isLoading={this.state.trips.isLoading}
          retryFunction={this.getTrips}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeHeader: headerActions.changeHeader,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(HomeContainer);
