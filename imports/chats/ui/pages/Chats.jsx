import React, { PureComponent } from 'react';

import { ChatHeader } from '../components/ChatHeader';
import { MessagesList } from '../components/MessagesList';
import { SendMessage } from '../components/SendMessage';

export class Chats extends PureComponent {
  render() {
    const {
      user: {
        serviceData: {
          groupId,
        },
      },
    } = this.props;
    return (
      <div id="chats" className="page">
        <div className="container paper no-padding">
          <ChatHeader />
          <MessagesList {...this.props} />
          <SendMessage
            groupId={groupId}
          />
        </div>
      </div>
    );
  }
}

export default Chats;
