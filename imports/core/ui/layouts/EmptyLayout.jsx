import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

export class EmptyLayoutComponent extends PureComponent {

  componentWillReceiveProps(nextProps) {
    const { user, location: { pathname } } = this.props;
    const {
      user: newUser,
      userReady: newUserReady,
    } = nextProps;
    if (newUser) {
      // Some redirect logic
    }
  }

  render() {
    const { children } = this.props;
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
