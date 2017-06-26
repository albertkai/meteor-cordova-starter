import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from '/imports/core';
import { todayActions } from '/imports/today';

export class SimpleBlockComponent extends PureComponent {

  checkSimpleBlock = () => {
    const {
      checkSimpleBlock,
      day: {
        _id,
      },
      blockName,
    } = this.props;
    checkSimpleBlock(_id, blockName);
  };

  render() {
    const {
      type,
      name,
      desc,
      block,
    } = this.props;
    const status = (() => {
      if (type === 'video' || type === 'audio') {
        return 'play';
      }
      return null;
    })();
    return (
      <div className={`block-item simple-block ${type}`}>
        <div>
          <Checkbox
            onChange={this.checkSimpleBlock}
            checked={block.passed}
            enableOnly
            // status={status}
          />
        </div>
        <div>
          <h3>{name}</h3>
          <p className="desc">{desc}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(todayActions, dispatch);

export const SimpleBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SimpleBlockComponent);

export default SimpleBlock;
