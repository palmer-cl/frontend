import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import ComponentLoader from './ComponentLoader';
import withErrorBoundary from './middlewares/WithErrorBoundary';
import ScrollToTop from './middlewares/ScrollToTop';
import withSegmentTracker from './middlewares/with_segment_tracker';
import PrivateRoute from './PrivateRoute';
import OnlyPublicRoute from './OnlyPublicRoute';
import Notfound from './../styled_scenes/NotFound';

const Home = 'home/home';
const EarnMoney = 'earn-money';
const TokenSale = 'token-sale';
const UserVerification = 'user-verification';
const CookiePolicy = 'cookie-policy';
const Account = 'account/account';
const Sessions = 'sessions/sessions';
const Results = 'results/results';
const Trip = 'trip';
const TripCreator = 'trip-creator';
const TripOrganizer = 'trip-organizer';
const TripShare = 'trip-share';
const Users = 'users/users';
const Services = 'services/services';
const Registrations = 'registrations/registrations';
const RecoverPassword = 'recover-password';
const ServiceUpsert = 'service-upsert';
const Checkout = 'checkout';
const BlogPost = 'blog';

const commonHOCs = comp =>
  withErrorBoundary(
    withSegmentTracker(
      Loadable({
        loader: () => import(`../scenes/${comp}`),
        loading: ComponentLoader,
      }),
    ),
  );

export default (
  <ScrollToTop>
    <Switch>
      <Route exact path={process.env.PUBLIC_URL + '/'} component={commonHOCs(Home)} />
      <OnlyPublicRoute path={process.env.PUBLIC_URL + '/login'} component={commonHOCs(Sessions)} />
      <Route
        path={process.env.PUBLIC_URL + '/user-verification'}
        component={commonHOCs(UserVerification)}
      />
      <OnlyPublicRoute
        path={process.env.PUBLIC_URL + '/register'}
        component={commonHOCs(Registrations)}
      />
      <OnlyPublicRoute
        path={process.env.PUBLIC_URL + '/recover-password'}
        component={commonHOCs(RecoverPassword)}
      />
      <Route path={process.env.PUBLIC_URL + '/earn-money'} component={commonHOCs(EarnMoney)} />
      <Route path={process.env.PUBLIC_URL + '/token-sale'} component={commonHOCs(TokenSale)} />
      <Route
        path={process.env.PUBLIC_URL + '/token-sale/smart-contract'}
        component={commonHOCs(TokenSale)}
      />
      <Route
        path={process.env.PUBLIC_URL + '/cookie-policy'}
        component={commonHOCs(CookiePolicy)}
      />
      <Route path={process.env.PUBLIC_URL + '/results'} component={commonHOCs(Results)} />
      <PrivateRoute
        path={process.env.PUBLIC_URL + '/services/new'}
        component={commonHOCs(ServiceUpsert)}
      />
      <PrivateRoute
        path={process.env.PUBLIC_URL + '/services/edit/:id'}
        component={commonHOCs(ServiceUpsert)}
      />
      <Route
        path={process.env.PUBLIC_URL + '/services/:slug?_:id'}
        component={commonHOCs(Services)}
      />
      <Route
        path={process.env.PUBLIC_URL + '/trips/organize/:id'}
        component={commonHOCs(TripOrganizer)}
        message="Please login or register to continue with your trip."
      />
      <Route
        path={process.env.PUBLIC_URL + '/trips/organize'}
        component={commonHOCs(TripOrganizer)}
      />
      <PrivateRoute
        path={process.env.PUBLIC_URL + '/trips/share/:id'}
        component={commonHOCs(TripShare)}
        message="Please login or register to share your trip."
      />
      <Route
        path={process.env.PUBLIC_URL + '/trips/checkout/:id'}
        component={commonHOCs(Checkout)}
      />
      <Route path={process.env.PUBLIC_URL + '/trips/create'} component={commonHOCs(TripCreator)} />
      <Route path={process.env.PUBLIC_URL + '/trips/:slug?_:id'} component={commonHOCs(Trip)} />
      <Route path={process.env.PUBLIC_URL + '/users/:userName'} component={commonHOCs(Users)} />
      <Route path={process.env.PUBLIC_URL + '/account'} component={commonHOCs(Account)} />
      <Route path={process.env.PUBLIC_URL + '/:slug'} component={commonHOCs(BlogPost)} />
      <Route component={withErrorBoundary(Notfound)} />
    </Switch>
  </ScrollToTop>
);
