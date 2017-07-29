import React, { PureComponent } from 'react';
import moment from 'moment';

const namesMap = {
  dailyTask: 'Дневное задание',
  wakeUp: 'Ранний подъем',
  sport: 'Зарядка',
  meditation: 'Медитация',
  water: 'Вода',
  taskList: 'Список задач',
  report: 'Вечерний отчет',
  kind: 'Доброе дело',
};

export class FeesModal extends PureComponent {
  render() {
    const {
      user: {
        fees: {
          items,
        },
      },
    } = this.props;
    return (
      <div id="fees-modal" className="popover-modal">
        <div className="modal-overlay" />
        <div className="modal-cont">
          <div className="modal-header">
            <button onClick={this.props.toggle} className="close">
              <i className="fa fa-times" /> Закрыть
            </button>
          </div>
          <div className="modal-body">
            <div className="icon">
              <i className="fa fa-money" />
            </div>
            <h3>Список штрафов:</h3>
            <ul className="fees-list">
              {items.map(i => <li>
                <div>{namesMap[i.name]}</div>
                <div>{moment(i.date).format('DD.MM.YYYY')}</div>
              </li>)}
            </ul>
          </div>
          <div className="modal-footer">
            <button onClick={this.props.toggle}>Оплатить!</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FeesModal;
