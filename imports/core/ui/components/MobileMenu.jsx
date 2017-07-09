import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export class MobileMenu extends PureComponent {
  render() {
    return (
      <div id="mobile-menu">
        <nav>
          <ul>
            <li>
              <Link to="/my-day" activeClassName="active">
                <i className="fa fa-plus-circle" />
              </Link>
            </li>
            <li>
              <Link to="/history" activeClassName="active">
                <i className="fa fa-history" />
              </Link>
            </li>
            <li>
              <Link to="/today" activeClassName="active">
                <i className="fa fa-list-ul" />
              </Link>
            </li>
            <li>
              <Link to="/chats" activeClassName="active">
                <i className="fa fa-comments-o" />
              </Link>
            </li>
            <li>
              <Link to="/profile" activeClassName="active">
                <i className="fa fa-user" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MobileMenu;
