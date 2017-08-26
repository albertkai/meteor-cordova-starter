import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '/imports/core';

export class UserModal extends PureComponent {

  static propTypes = {
    user: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  goTo = (e, link) => {
    e.preventDefault();
    window.open(`https://${link.toLowerCase()}`, '_system');
  };

  render() {
    const {
      user: {
        personalData: {
          firstName,
          lastName,
          avatar,
          sphere,
          about,
          city,
          facebook,
          vkontakte,
          instagram,
        },
      },
    } = this.props;
    return (
      <div id="user-modal">
        <button
            className="close"
            onClick={this.props.toggle}
        >
          <i className="fa fa-times" />
        </button>
        <Avatar avatar={avatar} />
        <div className="name">
          <h3>{firstName}</h3>
          <h2>{lastName}</h2>
          {(city || sphere) && <p className="sphere">{sphere || ''} {(city && sphere) ? ',' : ''} {city || ''}</p>}
        </div>
        {about && <p className="about">{about}</p>}
        <div className="links">
          {facebook && <button className="social-link facebook" onClick={e => this.goTo(e, facebook)}>
            <i className="fa fa-facebook" />
          </button>}
          {vkontakte && <button className="social-link vk" onClick={e => this.goTo(e, vkontakte)}>
            <i className="fa fa-vk" />
          </button>}
          {instagram && <button className="social-link instagram" onClick={e => this.goTo(e, instagram)}>
            <i className="fa fa-instagram" />
          </button>}
        </div>
      </div>
    );
  }
}

export default UserModal;
