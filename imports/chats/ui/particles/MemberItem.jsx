import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Avatar, coreActions } from '/imports/core';

export class MemberItemComponent extends PureComponent {

  static propTypes = {
    user: PropTypes.object.isRequired,
    toggleUserModal: PropTypes.func.isRequired,
  };

  toggleUserModal = () => {
    const { user, toggleUserModal } = this.props;
    toggleUserModal(user);
  };

  render() {
    const {
      user: {
        personalData: {
          firstName,
          lastName,
          avatar,
        },
      },
    } = this.props;
    return (
      <button
          className="member-item"
          onClick={this.toggleUserModal}
      >
        <div>
          <Avatar avatar={avatar} />
        </div>
        <div>
          <p>{firstName} {lastName}</p>
        </div>
      </button>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(coreActions, dispatch);

export const MemberItem = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberItemComponent);

export default MemberItem;
