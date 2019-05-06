import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import asyncComponent from 'libs/asyncHOC';
import withErrorBoundary from './middlewares/WithErrorBoundary';
import ScrollToTop from './middlewares/ScrollToTop';
import withSegmentTracker from './middlewares/with_segment_tracker';

const Home = './../scenes/home/home';
const EarnMoney = './../scenes/earn-money';
const TokenSale = './../scenes/token-sale';
const UserVerification = '../scenes/user-verification';
const CookiePolicy = './../scenes/cookie-policy';
const Account = './../scenes/account/account';
const Sessions = './../scenes/sessions/sessions';
const Results = './../scenes/results/results';
const Trip = './../scenes/trip';
const TripCreator = './../scenes/trip-creator';
const TripOrganizer = './../scenes/trip-organizer';
const TripShare = './../scenes/trip-share';
const Users = './../scenes/users/users';
const Services = './../scenes/services/services';
const Registrations = './../scenes/registrations/registrations';
const RecoverPassword = './../scenes/recover-password';
const Notfound = './../styled_scenes/NotFound';
const ServiceUpsert = '../scenes/service-upsert';
const Checkout = '../scenes/checkout';
const BlogPost = '../scenes/blog';
const PrivateRoute = './PrivateRoute';
const OnlyPublicRoute = './OnlyPublicRoute';

const commonHOCs = comp =>
  withErrorBoundary(withSegmentTracker(asyncComponent(() => import(comp))));

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
