import { Meteor } from 'meteor/meteor';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import {
  SideMenu,
  Header,
  FeesModal,
  PayFeesModal,
  MobileMenu,
  Loading,
  WakeUpModal,
  DaySuccessModal,
  VacationModal,
} from '/imports/core';
import { profileActions, ChoosePictureSource } from '/imports/profile';
import * as coreActions from '../../api/redux/actions';

const actions = Object.assign({}, coreActions, profileActions);

export class MainLayoutComponent extends PureComponent {

  static propTypes = {
    user: PropTypes.object,
    userReady: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    core: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    checkNotificationId: PropTypes.func.isRequired,
    setStatusBar: PropTypes.func.isRequired,
    preload: PropTypes.func.isRequired,
    toggleWakeUpModal: PropTypes.func.isRequired,
    toggleDaySuccessModal: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleVacation: PropTypes.func.isRequired,
    toggleFeesModal: PropTypes.func.isRequired,
    togglePayFeesModal: PropTypes.func.isRequired,
    toggleChoosePictureModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { location: { pathname } } = this.props;
    const {
      user,
      checkNotificationId,
    } = this.props;
    if (user && user.onboard) {
      if (!user.onboard.isFinished) {
        browserHistory.push(`/onboard/${user.onboard.step}`);
      } else if (user.blocked) {
        browserHistory.push('/pay');
      } else if (pathname === '/') {
        browserHistory.push('/today');
      }
    }
    if (Meteor.isCordova) checkNotificationId(user);
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: {
        pathname,
      },
      userReady,
      checkNotificationId,
      setStatusBar,
      preload,
    } = this.props;
    const {
      user: newUser,
      userReady: newUserReady,
    } = nextProps;
    if (newUser && newUser.onboard) {
      if (!newUser.onboard.isFinished) {
        browserHistory.push(`/onboard/${newUser.onboard.step}`);
      } else if (newUser.blocked) {
        browserHistory.push('/pay');
      } else if (pathname === '/') {
        browserHistory.push('/today');
      }
    }
    if (Meteor.isCordova) {
      setStatusBar('light');
      if (newUser && newUserReady && !userReady) {
        checkNotificationId(newUser);
      }
    }
    if (newUser && newUserReady && !userReady) {
      preload(newUser);
    }
  }

  render() {
    const {
      children,
      user,
      userReady,
      core: {
        menuOpened,
        wakeUpModalShown,
        daySuccessModalShown,
        vacationModalShown,
        feesModalShown,
        payFeesModalShown,
      },
      profile: {
        choosePictureModalShown,
      },
      toggleWakeUpModal,
      toggleDaySuccessModal,
      toggleMenu,
      toggleVacation,
      toggleFeesModal,
      togglePayFeesModal,
      toggleChoosePictureModal,
    } = this.props;
    return (
      <div id="main-layout" className="root">
        {
          user && userReady ?
            <div className={`loaded ${menuOpened ? '_menu-opened' : ''}`}>
              <SideMenu {...this.props} />
              <div className="main-content">
                <Header {...this.props} />
                <div className="content" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {React.cloneElement(children, this.props)}
                </div>
                <MobileMenu {...this.props} />
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
                {wakeUpModalShown && <WakeUpModal toggle={toggleWakeUpModal} />}
                {daySuccessModalShown && <DaySuccessModal toggle={toggleDaySuccessModal} />}
                {
                  choosePictureModalShown &&
                    <ChoosePictureSource toggle={toggleChoosePictureModal} />
                }
              </div>
              {
                vacationModalShown && <VacationModal
                    toggle={toggleVacation}
                    {...this.props}
                />
              }
              {
                feesModalShown && <FeesModal
                    toggle={toggleFeesModal}
                    {...this.props}
                />
              }
              {
                payFeesModalShown && <PayFeesModal
                    toggle={togglePayFeesModal}
                    {...this.props}
                />
              }
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
  profile: state.profile.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const MainLayout = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainLayoutContainer);


export default MainLayout;
