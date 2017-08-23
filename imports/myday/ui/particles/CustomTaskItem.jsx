import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Switcher } from '/imports/core';
import { CustomIcon, profileActions } from '/imports/profile';
import * as mydayActions from '../../api/redux/actions';

const actions = Object.assign({}, mydayActions, profileActions);

const namesMap = {
  checkbox: 'Чекбокс',
  text: 'Текст',
};

const daysMap = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
  7: 'Вс',
};

export class CustomTaskItemComponent extends PureComponent {

  toggle = () => {
    const {
      block: {
        _id,
      },
      toggleCustomBlock,
    } = this.props;
    toggleCustomBlock(_id);
  };

  getFrequency = (frequency) => {
    if (frequency.name === 'daily') {
      return 'Ежедневно';
    } else if (frequency.name === 'days') {
      return `${frequency.options.dayNames.map(d => daysMap[d]).join(', ')}`;
    } else if (frequency.name === 'monthly') {
      return `Раз в месяц ${frequency.options.date} числа`;
    }
    return '';
  };

  render() {
    const {
      block: {
        name,
        frequency,
        type,
        color,
        enabled,
      },
      openCustomTaskModal,
    } = this.props;
    return (
      <div className={`task-item custom-task-item ${color} ${enabled ? '_enabled' : ''}`}>
        <div>
          <button
              className="remove"
              onClick={() => openCustomTaskModal(this.props.block)}
          >
            <i className="fa fa-edit" />
          </button>
          <h3>{name}</h3>
          <div className="props">
            <p>Собственное задание</p>
            <p>Как часто: <strong>{this.getFrequency(frequency)}</strong></p>
            <p>Тип: <strong>{namesMap[type]}</strong></p>
          </div>
        </div>
        <div>
          <div className="icon">
            <CustomIcon />
          </div>
          <Switcher
              checked={enabled}
              onChange={this.toggle}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const CustomTaskItem = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomTaskItemComponent);

export default CustomTaskItem;
