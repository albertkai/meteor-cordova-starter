import React, { PureComponent } from 'react';
import { Link } from 'react-router';

import { Avatar } from '/imports/core';

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
          <img src="/images/logo.jpg" alt="logo" />
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
                <Link to="/chats" activeClassName="active">
                   Чаты
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
              <h4><i className="fa fa-warning"/> Оплатите штрафы:</h4>
              <h2>1500Р <button onClick={toggleFeesModal}>?</button></h2>
              <button onClick={togglePayFeesModal}>Оплатить</button>
              <p>Штрафы необходимо погасить не позднее чем через 5 суток после начисления, иначе вы не сможете продолжить пользоваться приложением</p>
            </div>
          }
          <div className="vacation">
            <button onClick={toggleVacation}>Взять отпуск</button>
            {/*<p>Использовано <strong>3</strong> из <strong>7</strong> в этом месяце</p>*/}
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
