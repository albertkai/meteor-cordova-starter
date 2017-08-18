import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from '/imports/core';
import { todayActions } from '/imports/today';

export class WaterBlockComponent extends PureComponent {

  static propTypes = {
    checkWaterBlock: PropTypes.func.isRequired,
    day: PropTypes.object,
    block: PropTypes.object,
    type: PropTypes.string,
  };

  static defaultProps = {
    day: null,
    block: null,
    type: '',
  };

  checkWaterBlock = () => {
    const {
      checkWaterBlock,
      day: {
        _id,
      },
    } = this.props;
    checkWaterBlock(_id);
  };

  render() {
    const {
      block,
      type,
    } = this.props;
    const volume = block.data ? block.data.volume : 0;
    return (
      <div className={`block-item water ${type} ${block.name} ${block.passed ? '_passed' : ''}`}>
        <div>
          <Checkbox
              status="tint"
              checked={block.passed}
              onChange={this.checkWaterBlock}
              enableOnly
          />
        </div>
        <div>
          {
            block.passed
              ? <h3>Выпито 2 литра воды</h3>
              : <h3><span>{(volume / 1000).toFixed(1)}</span> из <span>2</span> литров воды</h3>
          }
          <p className="desc">Минимум 2 литра</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(todayActions, dispatch);

export const WaterBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WaterBlockComponent);

export default WaterBlock;
