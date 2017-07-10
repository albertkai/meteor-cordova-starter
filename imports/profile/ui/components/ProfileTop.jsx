import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Avatar, coreConstants } from '/imports/core';
import { profileActions } from  '/imports/profile';

export class ProfileTopComponent extends PureComponent {

  _renderLink(type, name, active) {
    const { toggleChatType } = this.props;
    const activeClass = active === type ? 'active' : '';
    const onClick = (e) => {
      e.preventDefault();
      toggleChatType(type);
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
      uploadAvatar,
      uploadBackground,
    } = this.props;
    return (
      <div id="profile-top">
        <div
          className="profile-bg"
          style={{ backgroundImage: `url(${coreConstants.CLOUDFRONT_URL}images/${background})` }}
        >
          <div className="container">
            <Avatar
              avatar={avatar}
              onChange={uploadAvatar}
            />
            <div className="name">
              <h3>{firstName} {lastName}</h3>
              {/*<p>Отель Летучая рыба, <span>директор</span></p>*/}
            </div>
          </div>
          <div className="change-background">
            <input type="file" onChange={uploadBackground} />
            <i className="fa fa-image" />
          </div>
        </div>
        <div className="tabs-heading-cont">
          <div className="container">
            <ul className="tabs-heading">
              <li className="active"><a href="">Информация</a></li>
              <li><a href="">Приватность</a></li>
              <li><a href="">Оповещения</a></li>
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
  bindActionCreators(profileActions, dispatch);

export const ProfileTop = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileTopComponent);

export default ProfileTop;
