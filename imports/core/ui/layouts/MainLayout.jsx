import { Meteor } from 'meteor/meteor';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import * as coreActions from '../../api/redux/actions';

const actions = Object.assign({}, coreActions);

export class MainLayoutComponent extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
    userReady: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    core: PropTypes.object.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  render() {
    return (
      <div id="main-layout">
        {
          user && userReady
            ? <div>
                <h1>This is the login protected part of the app</h1>
              </div>
            : <Loading />
        }
      </div>
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
