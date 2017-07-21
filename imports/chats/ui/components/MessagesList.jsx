import React, { PureComponent } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Messages, MessageItem } from '/imports/chats';

export class MessagesListComponent extends PureComponent {

  componentDidUpdate(prevProps) {
    const {
      messages: prevMessages,
      chats: {
        chatType: prevChatType,
      },
    } = prevProps;
    const {
      messages,
      chats: {
        chatType,
      }
    } = this.props;
    if (
      (prevMessages &&
      messages &&
      prevMessages.length !== messages.length) ||
      prevChatType !== chatType
    ) {
      this.cont.scrollTop = this.cont.scrollHeight;
    }
    // this.cont.scrollTop = this.cont.scrollHeight;
  }

  render() {
    const {
      user,
      messages,
      messagesReady,
    } = this.props;
    return (
      <div id="messages-list">
        <div className="messages-content" ref={ref => this.cont = ref}>
          {
            messagesReady ?
              messages.map(m => (
                <MessageItem
                  message={m}
                  key={m._id}
                  user={user}
                />
              )) :
              <p>Loading...</p>
          }
        </div>
      </div>
    );
  }
}

const MessagesListContainer = createContainer(({
  chats: {
    chatType,
  },
  user: {
    serviceData: {
      groupId,
    },
  },
}) => {
  let thread;
  if (chatType === 'common' || chatType === 'insights') {
    thread = chatType;
  } else {
    thread = groupId;
  }
  const handle = Meteor.subscribe('messages.listMessages', thread);
  const messages = Messages.find().fetch();
  return {
    messages,
    messagesReady: handle.ready(),
  };
}, MessagesListComponent);

const mapStateToProps = state => ({
  chats: state.chats.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export const MessagesList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesListContainer);

export default MessagesList;
