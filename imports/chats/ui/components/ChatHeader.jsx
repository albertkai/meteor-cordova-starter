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
        <a onClick={onClick} dangerouslySetInnerHTML={{ __html: name }} />
      </li>
    );
  }

  render() {
    const { chats: { component } } = this.props;
    return (
      <div id="chat-header">
        <ul className="tabs-heading">
          {this._renderLink('chat', '<i class="fa fa-commenting-o" />', component)}
          {this._renderLink('members', '<i class="fa fa-users" />', component)}
          {this._renderLink('progress', '<i class="fa fa-list-ul" />', component)}
          {this._renderLink('insights', '<i class="fa fa-lightbulb-o" />', component)}
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
