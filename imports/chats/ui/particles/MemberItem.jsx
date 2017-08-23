import React, { PureComponent } from 'react';

import { Avatar } from '/imports/core';

export class MemberItem extends PureComponent {
  render() {
    const {
      user: {
        personalData: {
          firstName,
          lastName,
          avatar,
        },
      },
    } = this.props;
    return (
      <div className="member-item">
        <div>
          <Avatar avatar={avatar} />
        </div>
        <div>
          <p>{firstName} {lastName}</p>
        </div>
      </div>
    );
  }
}

export default MemberItem;
