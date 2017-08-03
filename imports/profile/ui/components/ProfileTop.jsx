import React, { PureComponent } from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Avatar, coreConstants, coreActions } from '/imports/core';
import * as profileActions from '../../api/redux/actions';

const actions = Object.assign({}, profileActions, coreActions);

export class ProfileTopComponent extends PureComponent {

  _renderLink(type, name, active) {
    const { toggleTab } = this.props;
    const activeClass = active === type ? 'active' : '';
    const onClick = (e) => {
      e.preventDefault();
      toggleTab(type);
    };
    return (
      <li className={activeClass}>
        <a onClick={onClick}>{name}</a>
      </li>
    );
  }

  render() {
    const {
      user: {
        personalData: {
          avatar,
          background,
          firstName,
          lastName,
        },
      },
      profile: {
        openedTab,
      },
      uploadAvatar,
      uploadBackground,
      logOut,
    } = this.props;
    let backgroundUrl;
    if (background.match(/samples/g)) {
      backgroundUrl = `${coreConstants.CLOUDFRONT_URL}${background}`;
    } else {
      backgroundUrl = `${coreConstants.CLOUDFRONT_URL}images/${background}`;
    }
    return (
      <div id="profile-top">
        <div
          className="profile-bg"
          style={{ backgroundImage: `url(${backgroundUrl})` }}
        >
          <div className="container">
            <Avatar
              avatar={avatar}
              onChange={uploadAvatar}
            />
            <div className="name">
              <h3>{firstName} {lastName}</h3>
            </div>
          </div>
          <div className="change-background">
            <input type="file" onChange={uploadBackground} />
            <i className="fa fa-image" />
          </div>
          <button className="logout" onClick={logOut}>
            <i className="fa fa-sign-out" />
          </button>
        </div>
        <div className="tabs-heading-cont">
          <div className="container">
            <ul className="tabs-heading">
              {this._renderLink('info', 'Информация', openedTab)}
              {this._renderLink('privacy', 'Приватность', openedTab)}
              {this._renderLink('notifications', 'Оповещения', openedTab)}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const ProfileTop = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileTopComponent);

export default ProfileTop;
