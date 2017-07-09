import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { chatsActions } from '/imports/chats';

export class SendMessageComponent extends PureComponent {

  onChange = e => {
    if (e.which === 13) {
      e.preventDefault();
      this.sendMessage();
      this.input.value = '';
    }
  };

  sendMessage = () => {
    const {
      chats: {
        chatType,
      },
      groupId,
      sendMessage,
    } = this.props;
    const content = this.input.value;
    let thread;
    if (chatType === 'common' || chatType === 'insight') {
      thread = chatType;
    } else {
      thread = groupId;
    }
    sendMessage(thread, content, 'text');
  };

  render() {
    return (
      <div id="send-message">
        <textarea
          ref={ref => this.input = ref}
          type="text"
          onKeyDown={this.onChange}
          className="message-input"
          placeholder="Type message..."
        />
        <button
          type="submit"
          className="message-submit"
          onClick={this.sendMessage}
        >
          Send
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chats: state.chats.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(chatsActions, dispatch);

export const SendMessage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SendMessageComponent);

export default SendMessage;
