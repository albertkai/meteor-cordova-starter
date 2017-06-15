import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { coreActions } from '/imports/core';

const locationsMap = {
  '/today': 'Сегодня',
  '/history': 'История',
  '/goals': 'Цели',
  '/profile': 'Профиль',
}

export class HeaderComponent extends PureComponent {
  render() {
    const { logOut } = this.props;
    return (
      <header id="header">
        <div>
          <h2>{locationsMap[this.props.location.pathname]}</h2>
        </div>
        <aside>
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
