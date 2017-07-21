import { Meteor } from 'meteor/meteor';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import { SideMenu, Header, FeeModal, MobileMenu, Loading } from '/imports/core';
import * as actions from '../../api/redux/actions';

export class MainLayoutComponent extends PureComponent {

  componentWillReceiveProps(nextProps) {
    const {
      location: {
        pathname,
      },
      user,
      userReady,
      checkNotificationId,
    } = this.props;
    const {
      user: newUser,
      userReady: newUserReady,
    } = nextProps;
    console.log('Component will receive');
    if (newUser && newUser.onboard) {
      if (!newUser.onboard.isFinished) {
        browserHistory.push(`/onboard/${newUser.onboard.step}`);
      } else {
        if (newUser.blocked) {
          browserHistory.push('/pay');
        } else if (pathname === '/') {
          browserHistory.push('/today');
        }
      }
    }
    if (Meteor.isCordova && newUser && newUserReady && !userReady) {
      checkNotificationId(newUser);
    }
  }

  componentDidMount(prevProps) {
    const { location: { pathname } } = this.props;
    const {
      user,
      userReady,
      checkNotificationId,
    } = this.props;
    if (user && user.onboard) {
      if (!user.onboard.isFinished) {
        browserHistory.push(`/onboard/${user.onboard.step}`);
      } else {
        if (user.blocked) {
          browserHistory.push('/pay');
        } else if (pathname === '/') {
          browserHistory.push('/today');
        }
      }
    }
    if (Meteor.isCordova) checkNotificationId(user);
  }

  render() {
    const {
      children,
      user,
      userReady,
      core: {
        menuOpened,
      },
      toggleMenu,
    } = this.props;
    return (
      <div id="main-layout" className="root">
        {
          user && userReady ?
            <div className={`loaded ${menuOpened ? '_menu-opened' : ''}`}>
              <SideMenu {...this.props} />
              <div className="main-content">
                <Header {...this.props} />
                <div className="content">
                  {React.cloneElement(children, this.props)}
                </div>
                <MobileMenu />
                <button
                  className="close-overlay"
                  onClick={toggleMenu}
                >
                  <div>
                    <span><i className="fa fa-chevron-left" /></span>
                    <span>З</span>
                    <span>А</span>
                    <span>К</span>
                    <span>Р</span>
                    <span>Ы</span>
                    <span>Т</span>
                    <span>Ь</span>
                  </div>
                </button>
              </div>
            </div> :
            <Loading />
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
