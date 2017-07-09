import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { coreActions } from '/imports/core';

const locationsMap = {
  '/today': 'Сегодня',
  '/history': 'История',
  '/chats': 'Чаты',
  '/my-day': 'Мой распорядок',
  '/goals': 'Цели',
  '/profile': 'Профиль',
}

export class HeaderComponent extends PureComponent {
  render() {
    const {
      logOut,
      toggleMenu,
    } = this.props;
    return (
      <header id="header">
        <button
          className="toggle-menu"
          onClick={toggleMenu}
        >
          <i className="fa fa-bars" />
        </button>
        <button
          className="toggle-notifications"
          onClick={toggleMenu}
        >
          <i className="fa fa-volume-down" />
        </button>
        <div className="logo">
          betterme
        </div>
        <div className="hidden-xs hidden-sm">
          <h2>{locationsMap[this.props.location.pathname]}</h2>
        </div>
        <aside className="hidden-sm hidden-xs">
          <button onClick={logOut}>Выйти</button>
        </aside>
      </header>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(coreActions, dispatch);

export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderComponent);

export default Header;
