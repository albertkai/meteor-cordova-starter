import React, { PureComponent } from 'react';
import { Link } from 'react-router';

import { Avatar, LogoIcon } from '/imports/core';

export class SideMenu extends PureComponent {

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.closeMenu();
    }
  }

  render() {
    const {
      user: {
        personalData: {
          firstName,
          lastName,
          avatar,
        },
        serviceData: {
          vacationUntil,
        },
        fees: {
          toPay,
        },
      },
      toggleVacation,
      toggleFeesModal,
      togglePayFeesModal,
    } = this.props;
    return (
      <div id="side-menu" className="side-menu">
        <header>
          <LogoIcon />
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
                <Link to="/my-day" activeClassName="active">
                  Мой распорядок
                </Link>
              </li>
              <li>
                <Link to="/history" activeClassName="active">
                  История
                </Link>
              </li>
              <li>
                <Link to="/group" activeClassName="active">
                   Моя группа
                </Link>
              </li>
              {/*<li>*/}
                {/*<Link to="/goals" activeClassName="active">*/}
                  {/*Цели*/}
                {/*</Link>*/}
              {/*</li>*/}
            </ul>
          </nav>
          {
            !!toPay && <div className="fee">
              <h4><i className="fa fa-warning" /> Оплатите штрафы:</h4>
              <h2>{toPay}р<button onClick={toggleFeesModal}>?</button></h2>
              <button onClick={togglePayFeesModal}>Оплатить</button>
              <p>Штрафы необходимо погасить не позднее чем через 5 суток после начисления, иначе вы не сможете продолжить пользоваться приложением</p>
            </div>
          }
          <div className="vacation">
            <button onClick={toggleVacation}>{vacationUntil ? 'Вы в отпуске' : 'Взять отпуск'}</button>
          </div>
          <footer>
            <div className="support">
              <h5>Поддержка:</h5>
              <a href="mailto:support@levelup.chat">support@better.me</a>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default SideMenu;
