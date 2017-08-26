import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import _ from 'underscore';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ItemsLoading } from '/imports/core';
import { Messages, MessageItem, SendMessage } from '/imports/chats';
import * as actions from '../../api/redux/actions';

export class MessagesListComponent extends PureComponent {

  static propTypes = {
    user: PropTypes.object.isRequired,
    messages: PropTypes.array,
    messagesReady: PropTypes.bool.isRequired,
    gotMore: PropTypes.bool.isRequired,
    chats: PropTypes.object.isRequired,
    setInitiallyScrolled: PropTypes.func.isRequired,
    resetMessagesLimit: PropTypes.func.isRequired,
    messagesLoadMore: PropTypes.func.isRequired,
    messagesCount: PropTypes.number,
    thread: PropTypes.string,
  };

  static defaultProps = {
    messages: [],
    messagesCount: 0,
    thread: '',
  };

  componentDidMount() {
    this.cont.scrollTop = this.cont.scrollHeight;
    // Meteor.subs.reset();
  }

  componentDidUpdate(prevProps) {
    const {
      messages: prevMessages,
      messagesReady: prevMessagesReady,
      chats: {
        chatType: prevChatType,
        limit: prevLimit,
      },
    } = prevProps;
    const {
      messages,
      messagesReady,
      chats: {
        scrollHeight,
        initiallyScrolled,
      },
      setInitiallyScrolled,
    } = this.props;
    // TODO think about the better way to scroll down to the message
    // if (
    //   prevMessages &&
    //   messages &&
    //   prevMessages.length - messages.length === 1
    // ) {
    //   this.cont.scrollTop = this.cont.scrollHeight;
    // }
    if (messagesReady && messages.length > 0 && !initiallyScrolled) {
      setInitiallyScrolled();
      this.cont.scrollTop = this.cont.scrollHeight;
    }
    if (
      messages.length !== prevMessages.length ||
      (messagesReady && !prevMessagesReady)
    ) {
      if (scrollHeight) {
        Meteor.defer(() => {
          this.cont.scrollTop = this.cont.scrollHeight - scrollHeight;
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.resetMessagesLimit();
  }

  loadMore = () => {
    if (this.props.gotMore) {
      this.props.messagesLoadMore(this.cont);
    }
  };

  render() {
    const {
      user,
      messages,
      messagesReady,
      gotMore,
      messagesCount,
      thread,
    } = this.props;
    return (
      <div id="messages-list">
        <div
            className="messages-content"
            ref={(ref) => this.cont = ref}
            onScroll={_.throttle(this.loadMore, 100)}
        >
          {
            gotMore
              ? <div className="load-more"><i className="fa fa-spin fa-spinner" /> Загружаем...</div>
              : <div className="load-more">Все загружено ({messagesCount})</div>
          }
          {!messagesReady && !messages.length && <ItemsLoading />}
          {
            messages.map(m => (
              <MessageItem
                  message={m}
                  key={m._id}
                  user={user}
              />
            ))
          }
        </div>
        <SendMessage thread={thread} groupId={user.serviceData.groupId} />
      </div>
    );
  }
}

const MessagesListContainer = createContainer(({
  chats: {
    limit,
  },
  thread: threadName,
  user: {
    serviceData: {
      groupId,
    },
  },
}) => {
  let thread;
  if (threadName === 'common' || threadName === 'insights') {
    thread = threadName;
  } else {
    thread = groupId;
  }
  const handle = Meteor.subs.subscribe('messages.listMessages', thread, limit);
  Meteor.subscribe('messages.countMessages', thread);
  const messages = Messages
    .find({ thread }, { sort: { createdAt: -1 }, limit })
    .fetch()
    .reverse();
  const messagesCount = Counts.get('messagesLength');
  return {
    gotMore: messagesCount ? limit < messagesCount : null,
    messages,
    messagesReady: handle.ready(),
    messagesCount,
  };
}, MessagesListComponent);

const mapStateToProps = state => ({
  chats: state.chats.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const MessagesList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessagesListContainer);

export default MessagesList;
