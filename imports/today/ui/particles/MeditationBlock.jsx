import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from '/imports/core';
import * as coreActions from '/imports/core/api/redux/actions';
import * as todayActions from '../../api/redux/actions';
import { Dropdown } from '../particles/Dropdown';

const actions = Object.assign({}, coreActions, todayActions);

const options = [
  { name: 'Расслабление', value: 'relax' },
  { name: 'Денежный поток', value: 'money' },
];

export class MeditationBlockComponent extends PureComponent {

  state = {
    name: 'relax',
  };

  setName = (e) => {
    this.setState({ name: e.target.value });
  };

  toggleMeditationOverlay = () => {
    this.props.toggleMeditationOverlay(this.state.name);
  };

  render() {
    const {
      type,
      name,
      block,
    } = this.props;
    return (
      <div className={`block-item meditation-block ${type} ${block.name} ${block.passed ? '_passed' : ''}`}>
        <div>
          <Checkbox
              onChange={this.toggleMeditationOverlay}
              checked={block.passed}
              enableOnly
              status="play"
          />
        </div>
        <div>
          <h3>{name}</h3>
          <Dropdown
              options={options}
              value={this.state.name}
              onChange={this.setName}
              disabled={block.passed}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const MeditationBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeditationBlockComponent);

export default MeditationBlock;

