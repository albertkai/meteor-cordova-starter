import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Textarea from 'react-textarea-autosize';

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
      thread: threadType,
      groupId,
      sendMessage,
    } = this.props;
    const content = this.input.value.trim();
    if (content) {
      let thread;
      if (threadType === 'common' || threadType === 'insights') {
        thread = threadType;
      } else {
        thread = groupId;
      }
      sendMessage(thread, content, 'text');
      this.input.value = '';
    }
  };

  render() {
    return (
      <div id="send-message">
        <Textarea
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
          <i className="fa fa-send" />
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
