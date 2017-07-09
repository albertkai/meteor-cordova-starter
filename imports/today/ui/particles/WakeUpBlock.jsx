import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from '/imports/core';
import { todayActions } from '/imports/today';

export class WakeUpBlockComponent extends PureComponent {

  checkWakeUpBlock = () => {
    const {
      checkWakeUpBlock,
      day: {
        _id,
      },
    } = this.props;
    checkWakeUpBlock(_id);
  };

  render() {
    const {
      block,
    } = this.props;
    return (
      <div className={`block-item wake-up-block`}>
        <div>
          <Checkbox
            onChange={this.checkWakeUpBlock}
            checked={block.passed}
            enableOnly
          />
        </div>
        <div>
          <h3>Ранний подъем</h3>
          <p className="desc">Вам необходимо поставить отметку здесь не позже {block.options.time.replace(/.$/, '5')}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(todayActions, dispatch);

export const WakeUpBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WakeUpBlockComponent);

export default WakeUpBlock;