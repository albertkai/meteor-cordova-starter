import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from '/imports/core';
import { todayActions } from '/imports/today';

export class SimpleBlockComponent extends PureComponent {

  static propTypes = {
    checkSimpleBlock: PropTypes.func.isRequired,
    day: PropTypes.object.isRequired,
    block: PropTypes.object.isRequired,
    name: PropTypes.string,
    desc: PropTypes.string,
    color: PropTypes.string,
    customId: PropTypes.string,
    type: PropTypes.string.isRequired,
  };

  static defaultProps = {
    desc: '',
    name: '',
    color: '',
    customId: '',
  };

  checkSimpleBlock = () => {
    const {
      checkSimpleBlock,
      day: {
        _id,
      },
      customId,
      block: {
        name,
      },
    } = this.props;
    checkSimpleBlock(_id, name, customId);
  };

  render() {
    const {
      type,
      name,
      desc,
      block,
      color,
    } = this.props;
    return (
      <div className={`block-item simple-block ${type} ${block.name} ${color} ${block.passed ? '_passed' : ''}`}>
        <div>
          <Checkbox
              onChange={this.checkSimpleBlock}
              checked={block.passed}
              enableOnly
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
