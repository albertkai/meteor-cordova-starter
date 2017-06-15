import React, { PureComponent } from 'react';
import { Link } from 'react-router';

import { Avatar } from '/imports/core';

export class SideMenu extends PureComponent {
  render() {
    const {
      user: {
        personalData: {
          firstName,
          lastName,
          avatar,
        },
      },
    } = this.props;
    return (
      <div id="side-menu" className="side-menu">
        <header>
          <p className="logo">Better:me</p>
        </header>
        <div className="content">
          <Link to="/profile" activeClassName="active" className="user-link">
            <span>
              <Avatar avatar={avatar} />
            </span>
            <span>
              <span>
                <span>{firstName}</span>
                <span>{lastName}</span>
              </span>
            </span>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/today" activeClassName="active">
                  Сегодня
                </Link>
              </li>
              <li>
                <Link to="/history" activeClassName="active">
                  История
                </Link>
              </li>
              <li>
                <Link to="/goals" activeClassName="active">
                  Цели
                </Link>
              </li>
            </ul>
          </nav>
          <div className="fee">
            <h4><i className="fa fa-warning"/> Оплатите штраф:</h4>
            <h2>1500Р <button>?</button></h2>
            <button>Оплатить</button>
            <p>Необходимо оплатить до 23:59 сегодня, иначе вы не сможете пользоваться сервисом</p>
          </div>
          <footer>
            <div className="support">
              <h5>Пожжержка:</h5>
              <a href="mailto:support@levelup.chat">support@better.me</a>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default SideMenu;
