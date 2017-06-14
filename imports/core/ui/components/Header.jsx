import React, { PureComponent } from 'react';

const locationsMap = {
  '/today': 'Сегодня',
  '/history': 'История',
  '/goals': 'Цели',
  '/profile': 'Профиль',
}

export class Header extends PureComponent {
  render() {
    return (
      <header id="header">
        <div>
          <h2>{locationsMap[this.props.location.pathname]}</h2>
        </div>
        <aside>
          <button>Выйти</button>
        </aside>
      </header>
    );
  }
}

export default Header;
