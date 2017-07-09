import React, { PureComponent } from 'react';

export class MessageItem extends PureComponent {
  render() {
    const {
      message: {
        author,
        content,
        createdAt,
      },
      user: {
        _id,
      },
    } = this.props;
    const isPersonal = _id === author;
    return (
      <div id="message-item">
        <div className={`message new ${isPersonal ? 'message-personal' : ''}`}>
          {!isPersonal && <figure className="avatar">]
            <img
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"
            />
          </figure>}
          {content}
          <div className="timestamp">{createdAt}</div>
        </div>
      </div>
    );
  }
}

export default MessageItem;
