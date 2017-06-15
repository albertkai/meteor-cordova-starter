import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import { Loading } from '/imports/core';

export class EmptyLayoutComponent extends PureComponent {

  componentWillReceiveProps(nextProps) {
    const { user, location: { pathname } } = this.props;
    const {
      user: newUser,
      userReady: newUserReady,
    } = nextProps;
    if (newUser) {
      if (newUser.blocked) {
        browserHistory.push('/pay');
      } else if (pathname === '/login') {
        browserHistory.push('/today');
      }
    }
  }

  render() {
    const { children, user, userReady } = this.props;
    return (
      <div id="empty-layout">
        <div className="content">
          {React.cloneElement(children, this.props)}
        </div>
      </div>
    );
  }
}

export const EmptyLayout = createContainer(() => {
  const handle = Meteor.subscribe('users.data');
  return {
    user: Meteor.user(),
    userReady: handle.ready(),
  };
}, EmptyLayoutComponent);

export default EmptyLayout;
