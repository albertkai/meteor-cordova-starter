import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ChatHeader } from '../components/ChatHeader';
import { GroupChat } from '../components/GroupChat';
import { GroupMembers } from '../components/GroupMembers';
import { Feed } from '../components/Feed';
import { MessagesList } from '../components/MessagesList';

const componentsMap = {
  chat: {
    component: MessagesList,
    properties: {
      thread: 'group',
    },
  },
  members: {
    component: GroupMembers,
    properties: {},
  },
  progress: {
    component: Feed,
  },
  insights: {
    component: MessagesList,
    properties: {
      thread: 'insights',
    },
  },
};

export class ChatsComponent extends PureComponent {
  render() {
    const {
      user: {
        serviceData: {
          groupId,
        },
      },
      chats: {
        component,
      },
    } = this.props;
    const targetComponent = componentsMap[component];
    const Dynamic = targetComponent.component;
    return (
      <div id="chats" className="page">
        <div className="container paper no-padding">
          <ChatHeader />
          <Dynamic {...targetComponent.properties} {...this.props} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chats: state.chats.toJS(),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

export const Chats = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatsComponent);

export default Chats;
