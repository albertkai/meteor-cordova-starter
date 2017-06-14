import React, { PureComponent } from 'react';

export class ProfileTop extends PureComponent {
  render() {
    return (
      <div id="profile-top">
        <div className="profile-bg">
          <div className="container">
            <div className="avatar" />
            <div className="name">
              <h3>Галя Мазина</h3>
              <p>Отель Летучая рыба, <span>директор</span></p>
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
