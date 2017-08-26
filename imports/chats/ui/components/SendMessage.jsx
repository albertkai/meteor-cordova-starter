import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Textarea from 'react-textarea-autosize';

import { chatsActions } from '/imports/chats';

export class SendMessageComponent extends PureComponent {

  static propTypes = {
    thread: PropTypes.string,
    groupId: PropTypes.string.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    thread: '',
  };

  state = {
    value: '',
  };

  onChange = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.sendMessage();
    } else {
      this.setState({ value: e.target.value });
    }
  };

  sendMessage = () => {
    const {
      thread: threadType,
      groupId,
      sendMessage,
    } = this.props;
    const { value: content } = this.state;
    if (content) {
      let thread;
      if (threadType === 'common' || threadType === 'insights') {
        thread = threadType;
      } else {
        thread = groupId;
      }
      sendMessage(thread, content, 'text');
      this.setState({ value: '' });
    }
  };

  render() {
    return (
      <div id="send-message">
        <Textarea
            type="text"
            onChange={this.onChange}
            value={this.state.value}
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
