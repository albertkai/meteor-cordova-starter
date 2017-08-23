import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import {
  ChatIcon,
  ListIcon,
  PlusIcon,
  UserIcon,
  HistoryIcon,
} from '/imports/today';

class Link extends Component {

  goTo = () => {
    browserHistory.push(this.props.to);
  };

  render() {
    const {
      active,
      to,
      children,
    } = this.props;
    const activeClass = active === to ? '_active' : '';
    return (
      <button
        className={`link ${activeClass}`}
        onClick={this.goTo}
      >
        {children}
      </button>
    );
  }
}

export class MobileMenu extends Component {

  render() {
    const {
      location: {
        pathname,
      },
    } = this.props;
    return (
      <div id="mobile-menu">
        <nav>
          <ul>
            <li>
              <Link to="/my-day" active={pathname}>
                <PlusIcon />
              </Link>
            </li>
            <li>
              <Link to="/history" active={pathname}>
                <HistoryIcon />
              </Link>
            </li>
            <li>
              <Link to="/today" active={pathname}>
                <ListIcon />
              </Link>
            </li>
            <li>
              <Link to="/group" active={pathname}>
                <ChatIcon />
              </Link>
            </li>
            <li>
              <Link to="/profile" active={pathname}>
                <UserIcon />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MobileMenu;
