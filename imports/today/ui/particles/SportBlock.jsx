import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Checkbox } from '/imports/core';
import * as coreActions from '/imports/core/api/redux/actions';
import * as todayActions from '../../api/redux/actions';
import { Dropdown } from '../particles/Dropdown';

const actions = Object.assign({}, coreActions, todayActions);

const options = [
  { name: 'Базовая зарядка', value: 'sport1' },
  { name: 'Растяжка', value: 'stretching' },
  { name: 'Комплекс спартанца', value: 'sparta' },
  { name: 'Базовая йога', value: 'yoga' },
  { name: 'Цигун', value: 'tsigun' },
];

export class SportBlockComponent extends PureComponent {

  state = {
    name: 'sport1',
  };

  setName = (e) => {
    this.setState({ name: e.target.value });
  };

  toggleSportOverlay = () => {
    this.props.toggleSportOverlay(this.state.name);
  };

  render() {
    const {
      type,
      name,
      block,
    } = this.props;
    return (
      <div className={`block-item sport-block ${type} ${block.name} ${block.passed ? '_passed' : ''}`}>
        <div>
          <Checkbox
              onChange={this.toggleSportOverlay}
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

export const SportBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SportBlockComponent);

export default SportBlock;

