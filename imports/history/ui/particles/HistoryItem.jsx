import React, { PureComponent } from 'react';
import moment from 'moment';

import { EditableBlock } from '../particles/EditableBlock';

const names = {
  dailyTask: 'Задание на день',
  wakeUp: 'Ранний подъем',
  sport: 'Зарядка',
  meditation: 'Медитация',
  water: '2 литра воды',
  taskList: 'Задачи на день',
  report: 'Дневной отчет',
  kind: 'Доброе дело',
}

export class HistoryItem extends PureComponent {
  render() {
    const {
      day: {
        _id,
        name,
        createdAt,
        blocks,
      },
    } = this.props;
    const passed = blocks.filter(b => b.passed);
    const failed = blocks.filter(b => !b.passed);
    const dailyTask = blocks.find(b => b.name === 'dailyTask');
    const isFinished = moment(createdAt).valueOf() + 8640000 < Date.now();
    return (
      <div className="history-item">
        <header>
          <p>{moment(createdAt).format('DD.MM.YYYY')}</p>
          <p>{isFinished ? <span>Выполнено <span>{passed.length}</span> из <span>{blocks.length}</span></span> : <span>Сегодня</span>}</p>
        </header>
        <div className="body">
          {isFinished && !!passed.length && <div className="success summary">
            <div>
              <div>
                <i className="fa fa-check" />
              </div>
            </div>
            <p>{passed.map(b => <span key={`passed-${b.name}`}>{names[b.name]}</span>)}</p>
          </div>}
          {isFinished && !!failed.length && <div className="fails summary">
            <div>
              <div>
                <i className="fa fa-times" />
              </div>
            </div>
            <p>{failed.map(b => <span key={`failed-${b.name}`}>{names[b.name]}</span>)}</p>
          </div>}
        </div>
        <EditableBlock
          heading={`День ${dailyTask.options.day}. Задание`}
          task={dailyTask.options.html}
          data={dailyTask.data}
          dayId={_id}
          name="dailyTask"
        />
      </div>
    );
  }
}

export default HistoryItem;
