import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { ItemsLoading } from '/imports/core';
import { MemberItem } from '../particles/MemberItem';

export class GroupMembersComponent extends PureComponent {

  static propTypes = {
    users: PropTypes.array,
    usersReady: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    users: [],
  };

  render() {
    const {
      users,
      usersReady,
    } = this.props;
    return (
      <div id="group-members">
        {
          usersReady
            ? users.map(m => <MemberItem key={`member-item-${m._id}`} user={m} />)
            : <ItemsLoading />
        }
      </div>
    );
  }
}

export const GroupMembers = createContainer(() => {
  const handle = Meteor.subs.subscribe('users.groupUsers');
  const users = Meteor.users.find().fetch();
  return {
    users,
    usersReady: handle.ready(),
  };
}, GroupMembersComponent);

export default GroupMembers;
