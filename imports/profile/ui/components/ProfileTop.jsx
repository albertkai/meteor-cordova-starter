import React, { PureComponent } from 'react';

import { Avatar, coreConstants } from '/imports/core';

export class ProfileTop extends PureComponent {
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
    } = this.props;
    return (
      <div id="profile-top">
        <div
          className="profile-bg"
          style={{ backgroundImage: `url(${coreConstants.CLOUDFRONT_URL}${background})` }}
        >
          <div className="container">
            <Avatar avatar={avatar} />
            <div className="name">
              <h3>{firstName} {lastName}</h3>
              {/*<p>Отель Летучая рыба, <span>директор</span></p>*/}
            </div>
          </div>
        </div>
        <div className="tabs-heading-cont">
          <div className="container">
            <ul className="tabs-heading">
              <li className="active"><a href="">Основное</a></li>
              <li><a href="">Приватность</a></li>
              <li><a href="">Оповещения</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTop;
