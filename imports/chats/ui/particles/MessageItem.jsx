import React, { PureComponent } from 'react';
import moment from 'moment';

import { Avatar } from '/imports/core';

export class MessageItem extends PureComponent {
  render() {
    const {
      message: {
        author,
        content,
        createdAt,
        userData: {
          avatar,
          firstName,
          lastName,
        }
      },
      user: {
        _id,
      },
    } = this.props;
    const isPersonal = _id === author;
    return (
      <div id="message-item">
        <div className={`message new ${isPersonal ? 'message-personal' : ''}`}>
          {!isPersonal && <Avatar avatar={avatar} />}
          {content}
          <div className="timestamp">{moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}</div>
        </div>
      </div>
    );
  }
}

export default MessageItem;
