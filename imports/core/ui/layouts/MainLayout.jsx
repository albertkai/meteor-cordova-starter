import { Meteor } from 'meteor/meteor';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as coreActions from '../../api/redux/actions';
import { Index } from '../pages/Index';

const actions = Object.assign({}, coreActions);

export class MainLayoutComponent extends PureComponent {

  render() {
    return (
      <Router>
        <div id="main-layout">
          <Switch>
            <Route path="/" render={props => <Index {...this.props} {...props} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export const MainLayoutContainer = createContainer(() => {
  const handle = Meteor.subscribe('users.data');
  return {
    user: Meteor.user(),
    userReady: handle.ready(),
  };
}, MainLayoutComponent);

const mapStateToProps = state => ({
  core: state.core.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const MainLayout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayoutContainer);

export default MainLayout;
