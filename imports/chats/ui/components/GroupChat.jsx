import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { MessagesList } from '../components/MessagesList';
import { SendMessage } from '../components/SendMessage';

export class GroupChat extends PureComponent {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const {
      user: {
        serviceData: {
          groupId,
        },
      },
    } = this.props;
    return (
      <div id="group-chat">
        <MessagesList {...this.props} />
        <SendMessage
            groupId={groupId}
        />
      </div>
    );
  }
}

export default GroupChat;
