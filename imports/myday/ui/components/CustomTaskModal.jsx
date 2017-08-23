import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../api/redux/actions';

const days = [
  { name: 'Пн', value: '1' },
  { name: 'Вт', value: '2' },
  { name: 'Ср', value: '3' },
  { name: 'Чт', value: '4' },
  { name: 'Пт', value: '5' },
  { name: 'Сб', value: '6' },
  { name: 'Вс', value: '7' },
];

const frequencies = [
  { name: 'Ежедневно', value: 'daily' },
  { name: 'Дни недели', value: 'days' },
  { name: 'Ежемесячно', value: 'monthly' },
];

const colors = [
  { value: 'blue', name: 'Синий' },
  { value: 'violet', name: 'Фиолетовый' },
  { value: 'magenta', name: 'Сиреневый' },
  { value: 'red', name: 'Красный' },
  { value: 'orange', name: 'Оранжевый' },
  { value: 'yellow', name: 'Желтый' },
  { value: 'lawngreen', name: 'Желто-зеленый' },
  { value: 'green', name: 'Зеленый' },
];

export class CustomTaskModalComponent extends PureComponent {

  static propTypes = {
    addCustomTask: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    frequency: {
      name: 'daily',
      options: null,
    },
    type: 'checkbox',
    color: 'blue',
    error: false,
  };

  componentDidMount() {
    if (!_.isEmpty(this.props.task)) {
      const { task: { name, frequency, type, color } } = this.props;
      this.setState({
        name,
        frequency,
        type,
        color,
      });
    }
  }

  setName = (e) => {
    e.persist();
    this.setState({ name: e.target.value });
  };

  setColor = (e) => {
    this.setState({ color: e.target.value });
  };

  setType = (e) => {
    this.setState({ type: e.target.value });
  };

  setFrequencyDate = (e) => {
    this.setState({
      frequency: {
        name: 'monthly',
        options: {
          date: e.target.value,
        },
      },
    });
  };

  setFrequencyName = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    const frequency = (() => {
      if (name === 'daily') {
        return { name: 'daily' };
      } else if (name === 'days') {
        return { name: 'days', options: { dayNames: [days[0].value] } };
      } else if (name === 'monthly') {
        return { name: 'monthly', options: { date: 1 } };
      }
      return null;
    })();
    this.setState({ frequency });
  };

  toggleFrequencyDay = (day) => {
    const frequency = Object.assign({}, this.state.frequency);
    const { dayNames } = frequency.options;
    if (dayNames.includes(day)) {
      dayNames.splice(dayNames.indexOf(day), 1);
    } else {
      dayNames.push(day);
    }
    this.setState({ frequency });
  };

  save = () => {
    if (!this.state.name) {
      this.setState({ error: true });
    } else {
      const task = Object.assign({}, this.state);
      delete task.error;
      task._id = this.props.task._id;
      this.props.updateCustomTask(task);
    }
  };

  remove = () => {
    const sure = confirm('Вы действительно хотить удалить задание?');
    if (sure) {
      this.props.removeCustomTask(this.props.task);
    }
  };

  submit = () => {
    if (!this.state.name) {
      this.setState({ error: true });
    } else {
      const task = Object.assign({}, this.state);
      delete task.error;
      this.props.addCustomTask(task);
    }
  };

  renderDaysRadio = () => (
    <div className="days-radio options-cont">
      {days.map((d) => {
        const isSelected =
          this.state.frequency.options.dayNames.includes(d.value);
        return (
          <button
              key={`day-name-${d.value}`}
              className={isSelected ? '_selected' : ''}
              onClick={() => this.toggleFrequencyDay(d.value)}
          >
            {d.name}
          </button>
        );
      })}
    </div>
  );

  renderMonthlySelect = () => (
    <div className="monthly-select options-cont">
      <label htmlFor="select-date">Выберите дату:</label>
      <select id="select-date" onChange={this.setFrequencyDate} value={this.state.frequency.options.date}>
        {_.range(1, 32).map(n => <option key={`day-${n}`} value={n}>{n}</option>)}
      </select>
    </div>
  );

  render() {
    const isEdit = !_.isEmpty(this.props.task);
    return (
      <div id="custom-task-modal" className={`popover-modal ${this.state.color}`}>
        <div className="modal-overlay" />
        <div className="modal-cont">
          <div className="modal-header">
            <button onClick={this.props.toggle} className="close"><i className="fa fa-times" /> Закрыть</button>
          </div>
          <div className="modal-body">
            <h3>{isEdit ? 'Редактировать' : 'Создать:'}</h3>
            <div className="form-group name">
              <h5>Название:</h5>
              <input
                  type="text"
                  className={this.state.error ? 'error' : ''}
                  onChange={this.setName}
                  value={this.state.name}
                  placeholder="Напр. занятия йогой"
              />
            </div>
            <div className="form-group">
              <h5>Периодичность:</h5>
              <div className="button-group">
                {frequencies.map(f => (
                  <button
                      key={`freq-name-${f.name}`}
                      className={this.state.frequency.name === f.value ? '_selected' : ''}
                      onClick={e => this.setFrequencyName(e, f.value)}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
              { this.state.frequency.name === 'daily' && <div className="options-cont"><p>Задание будет добавляться ежедневно</p></div> }
              { this.state.frequency.name === 'days' && this.renderDaysRadio() }
              { this.state.frequency.name === 'monthly' && this.renderMonthlySelect() }
            </div>
            <div className="form-group-cont">
              <div className="form-group">
                <h5>Тип:</h5>
                <select onChange={this.setType} value={this.state.type}>
                  <option value="checkbox">Чекбокс</option>
                  <option value="text">Текст</option>
                </select>
              </div>
              <div className="form-group">
                <h5>Цвет:</h5>
                <select onChange={this.setColor} value={this.state.color}>
                  {colors.map(c => (
                    <option
                        value={c.value}
                        key={`color-name-${c.value}`}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            {
              isEdit
                ? <div className="buttons">
                  <button onClick={this.remove}>Удалить</button>
                  <button onClick={this.save}>Сохранить</button>
                </div>
                : <button onClick={this.submit}>Добавить задание</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators(actions, dispatch);

export const CustomTaskModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomTaskModalComponent);

export default CustomTaskModal;
