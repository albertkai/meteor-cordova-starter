import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import { SideMenu, Header, FeeModal, Loading } from '/imports/core';

export class MainLayoutComponent extends PureComponent {

  componentWillReceiveProps(nextProps) {
    const { location: {pathname} } = this.props;
    const {
      user: newUser,
      userReady: newUserReady,
    } = nextProps;
    if (newUser) {
      if (newUser.blocked) {
        browserHistory.push('/pay');
      } else if (pathname === '/') {
        browserHistory.push('/today');
      }
    }
  }

  render() {
    const { children, user, userReady } = this.props;
    return (
      <div id="main-layout" className="root">
        {
          user && userReady ?
            <div className="loaded">
              <SideMenu {...this.props} />
              <div className="main-content">
                <Header {...this.props} />
                <div className="content">
                  {React.cloneElement(children, this.props)}
                </div>
              </div>
            </div> :
            <Loading />
        }
      </div>
    );
  }
}

export const MainLayout = createContainer(() => {
  const handle = Meteor.subscribe('users.data');
  return {
    user: Meteor.user(),
    userReady: handle.ready(),
  };
}, MainLayoutComponent);


export default MainLayout;
