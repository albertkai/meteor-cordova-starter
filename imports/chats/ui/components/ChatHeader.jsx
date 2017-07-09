import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { chatsActions } from '/imports/chats';

export class ChatHeaderComponent extends React.Component {

  _renderLink(type, name, active) {
    const { toggleChatType } = this.props;
    const activeClass = active === type ? 'active' : '';
    const onClick = (e) => {
      e.preventDefault();
      toggleChatType(type);
    };
    return (
      <li className={activeClass}>
        <a onClick={onClick}>{name}</a>
      </li>
    );
  }

  render() {
    const { chats: { chatType } } = this.props;
    return (
      <div id="chat-header">
        <ul className="tabs-heading">
          {this._renderLink('group', 'Чат группы', chatType)}
          {this._renderLink('common', 'Общий чат', chatType)}
          {this._renderLink('insights', 'Инсайты', chatType)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chats: state.chats.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(chatsActions, dispatch);

export const ChatHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatHeaderComponent);

export default ChatHeader;
