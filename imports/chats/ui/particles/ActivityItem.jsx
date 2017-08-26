import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const blocksMap = {
  dailyTask: 'Дневное задание',
  sport: 'Зарядка',
  meditation: 'Медитация',
  water: '2 литра воды',
  taskList: '3 задачи',
  report: 'Вечерний отчет',
  kind: 'Доброе дело',
  custom: 'Свое задание',
  All: 'ВСЕ ВЫПОЛНЕНО!',
};


export class ActivityItem extends PureComponent {

  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  renderIcon = () => {
    const { item: { type } } = this.props;
    if (type === 'PASSED') {
      return <i className="fa fa-check" />;
    } else if (type === 'FEE') {
      return <i className="fa fa-times" />;
    } else if (type === 'WATER') {
      return <i className="fa fa-tint" />;
    } else if (type === 'ALL') {
      return <i className="fa fa-check-circle" />;
    }
  };

  render() {
    const {
      item: {
        name,
        type,
        userData: {
          firstName,
          lastName,
        },
        createdAt,
      },
    } = this.props;
    return (
      <div className={`activity-item ${type}`}>
        <div>
          {this.renderIcon()}
        </div>
        <div>
          <p className="task">{blocksMap[name] || `${name}р`}</p>
          <p className="name">{firstName} {lastName}</p>
        </div>
        <div>
          {moment(createdAt).calendar()}
        </div>
      </div>
    );
  }
}

export default ActivityItem;
